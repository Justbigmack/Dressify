const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')
const stripe = require('../stripe')

const { hasPermissions } = require('../utils')
const { generateResetPasswordEmail } = require('../mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // if (!ctx.request.userId)
    //   throw new Error('You must be logged in to add items!')

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args,
          images: { set: args.images }
        }
      },
      info
    )

    return item
  },

  updateItem(parent, args, ctx, info) {
    const updates = { ...args }
    delete updates.id
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    )
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    const item = await ctx.db.query.item({ where }, `{id title user { id } }`)

    // checking permissions
    const ownsItem = item.user.id === ctx.request.userId
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    )

    if (!ownsItem && !hasPermissions) {
      throw new Error('You need permissions to do that!')
    }

    return ctx.db.mutation.deleteItem({ where }, info)
  },

  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()
    // hashing the password
    const password = await bcrypt.hash(args.password, 10)
    // creating the user in db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    )
    // creating JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // setting JWT as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 90
    })

    return user
  },

  async signIn(parent, { email, password }, ctx, info) {
    // checking, if a user with that email exists
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) throw new Error('Incorrect email')

    // checking, if password is correct for that user
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('Password is not correct')

    // generting JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    // setting the cookie for the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 90
    })

    return user
  },

  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Goodbye' }
  },

  async requestReset(parent, args, ctx, info) {
    // checking validity of the user
    const user = await ctx.db.query.user({ where: { email: args.email } })
    if (!user) throw new Error('Invalid User Email')

    // setting a reset token and expiry on that user
    const resetToken = (await promisify(randomBytes)(20)).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // in 1 hour
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    })

    // emailing the reset token
    sgMail.send({
      from: 'andrew@gmail.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: generateResetPasswordEmail(resetToken)
    })

    return { message: 'Thanks' }
  },

  async resetPassword(parent, args, ctx, info) {
    // checking, if passwords do match
    if (args.password !== args.confirmPassword)
      throw new Error('Passwords do not match')
    // checking, if reset token is legit or expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    })

    if (!user) throw new Error('This token is invalid or has expired')

    // hashing the new pw
    const password = await bcrypt.hash(args.password, 10)

    // saving the new pw and removing old resetTokens
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    // generaing JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)

    // setting JWT cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 90
    })

    return updatedUser
  },

  async updatePermissions(parent, args, ctx, info) {
    // checking if the user is logged in
    if (!ctx.request.userId) throw new Error('You must be logged in!')

    // query the user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    )
    // checking permissions
    hasPermissions(currentUser, ['ADMIN', 'PERMISSIONUPDATE'])

    // updating permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    )
  },

  async addToCart(parent, args, ctx, info) {
    // checking if the user is logged in
    const { userId } = ctx.request
    if (!userId) throw new Error('You must be logged in!')

    // getting the current cart of the user
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id }
      }
    })

    // checking, if that item is already in their cart
    if (existingCartItem)
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        },
        info
      )

    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          item: {
            connect: { id: args.id }
          }
        }
      },
      info
    )
  },

  async removeFromCart(parent, args, ctx, info) {
    // finding cart item
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id
        }
      },
      `{id, user {id}}`
    )

    // checking, if that item exists
    if (!cartItem) throw new Error('No Item Found')

    // checking, if they own that cart item
    if (cartItem.user.id !== ctx.request.userId)
      throw new Error('You do not own that item')

    // deleting the cart item
    return ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id }
      },
      info
    )
  },

  async createOrder(parent, args, ctx, info) {
    // quering the current user and making sure they are signed in
    const { userId } = ctx.request

    if (!userId) throw new Error('You must be signed in to complete the order')

    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
        id
        name
        email 
        cart {
          id 
          quantity 
          item {
            title 
            price 
            id 
            description 
            images
          }
        }
      }
    `,
      info
    )

    // recalculating the total for the price
    const amount = user.cart.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.item.price,
      0
    )

    // // creating the stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token
    })

    // converting the cartItems to orderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
        images: { set: cartItem.item.images }
      }
      delete orderItem.id
      return orderItem
    })

    // // creating the order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    })

    // cleaning the user cart
    const cartItemIds = user.cart.map(cartItem => cartItem.id)

    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds
      }
    })

    // returning the order to the customer

    return order
  }
}

module.exports = Mutations
