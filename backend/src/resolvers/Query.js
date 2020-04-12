const { forwardTo } = require('prisma-binding')
const { hasPermissions } = require('../utils')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) return null

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    )
  },

  async users(parent, args, ctx, info) {
    // checking, if the user is logged in
    if (!ctx.request.userId) throw new Error('You must be logged in!')
    // checking, if the user has permissions to query all userSelect:
    hasPermissions(ctx.request.user, ['ADMIN', ['PERMISSIONUPDATE']])

    return ctx.db.query.users({}, info)
  },

  async order(parent, args, ctx, info) {
    // making sure they are logged in
    if (!ctx.request.userId) throw new Error('You must be logged in')

    // Quering the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    )

    // Checking, if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN'
    )

    if (!ownsOrder && !hasPermissionToSeeOrder)
      throw new Error('You do not have permissions to view that order')

    // Returning the order
    return order
  },

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request
    if (!userId) throw new Error('You must be logged in')

    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    )
  }
}

module.exports = Query
