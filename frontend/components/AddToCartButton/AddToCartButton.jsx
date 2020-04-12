import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'

import { CURRENT_USER_QUERY } from '../User/User'
import Button from '../styles/Button.styles'

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`

const AddToCartButton = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return (
    <Button
      onClick={async () => {
        NProgress.start()
        await addToCart()
        NProgress.done()
      }}
      disabled={loading}
    >
      Add{loading && 'ing'} to Cart
    </Button>
  )
}

AddToCartButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default AddToCartButton
