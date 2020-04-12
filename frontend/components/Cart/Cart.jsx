import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import CartItem from '../CartItem/CartItem'
import Checkout from '../Checkout/Checkout'
import { CURRENT_USER_QUERY } from '../User/User'
import formatMoney, { calcItems, calcTotalPrice } from '../../utils/calcUtils'
import Button from '../styles/Button.styles'
import { CartStyles, CloseButton } from './Cart.styles'

export const LS_CART_OPEN_QUERY = gql`
  query {
    cartOpen @client
  }
`

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`
const Cart = () => {
  const {
    data: { cartOpen }
  } = useQuery(LS_CART_OPEN_QUERY)

  const { loading, data } = useQuery(CURRENT_USER_QUERY)

  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)

  if (loading || !data || !data.me) return null
  const me = data.me

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <h3>My Cart</h3>
        <p data-test="cartText">
          You Have {calcItems(me.cart)}{' '}
          {calcItems(me.cart) === 1 ? 'Item' : 'Items'} in Your Cart
        </p>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p data-test="cartPrice">{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout>
          <Button>Checkout</Button>
        </Checkout>
      </footer>
    </CartStyles>
  )
}

export default Cart
