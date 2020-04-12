import React from 'react'
import PropTypes from 'prop-types'

import formatMoney from '../../utils/calcUtils'
import RemoveFromCartButton from '../RemoveFromCartButton/RemoveFromCartButton'
import { CartItemStyles } from './CartItem.styles'

const CartItem = ({ cartItem }) => {
  return cartItem.item ? (
    <CartItemStyles>
      <img src={cartItem.item.images[0]} alt={cartItem.item.title} />
      <div className="cart-item-summary">
        <p className="cart-item-title">
          {cartItem.item.title}{' '}
          {cartItem.quantity > 1 ? `x ${cartItem.quantity}` : null}
        </p>
        <p className="cart-item-category">{cartItem.item.category}</p>
        <p className="cart-item-price">
          {formatMoney(cartItem.item.price * cartItem.quantity)}
        </p>
      </div>
      <div className="cart-item-remove">
        <RemoveFromCartButton id={cartItem.id} />
      </div>
    </CartItemStyles>
  ) : (
    <CartItemStyles>
      This Item Has Been Deleted
      <RemoveFromCartButton id={cartItem.id} />
    </CartItemStyles>
  )
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
}

export default CartItem
