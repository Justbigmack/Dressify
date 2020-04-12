import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import { CURRENT_USER_QUERY } from '../User/User'
import { RemoteFromCartButtonStyles } from './RemoveFromCartButton.styles'

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`

const update = (cache, payload) => {
  const data = cache.readQuery({ query: CURRENT_USER_QUERY })

  const cartItemId = payload.data.removeFromCart.id
  data.me.cart = data.me.cart.filter((cartItem) => cartItem.id !== cartItemId)

  cache.writeQuery({ query: CURRENT_USER_QUERY, data })
}

const RemoveFromCartButton = ({ id }) => {
  const [removeFromCart] = useMutation(REMOVE_FROM_CART_MUTATION)
  return (
    <RemoteFromCartButtonStyles
      title="Delete Item"
      onClick={() =>
        removeFromCart({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            removeFromCart: {
              __typename: 'CartItem',
              id
            }
          },
          update
        })
      }
    >
      &times;
    </RemoteFromCartButtonStyles>
  )
}

RemoveFromCartButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default RemoveFromCartButton
