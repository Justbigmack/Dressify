import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useMutation } from '@apollo/react-hooks'
import Router from 'next/router'
import NProgress from 'nprogress'
import gql from 'graphql-tag'

import { calcItems, calcTotalPrice } from '../../utils/calcUtils'
import User, { CURRENT_USER_QUERY } from '../User/User'

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`

export const onToken = async (res, createOrder) => {
  NProgress.start()

  const order = await createOrder({
    variables: {
      token: res.id
    }
  }).catch((err) => {
    alert(err.message)
  })
  Router.push({
    pathname: '/order',
    query: { id: order.data.createOrder.id }
  })
}

const Checkout = ({ children }) => {
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return (
    <User>
      {({ me }) => {
        return (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Dressify"
            description={`You Are Ordering ${calcItems(me.cart)} ${
              calcItems(me.cart) === 1 ? 'Item' : 'Items'
            }!`}
            image="/logo.png"
            stripeKey="pk_test_GIDJTxoVfcCrmaOUOCsmjOIQ00Wx45cDfK"
            currency="USD"
            email={me.email}
            token={(res) => onToken(res, createOrder)}
          >
            {children}
          </StripeCheckout>
        )
      }}
    </User>
  )
}

export default Checkout
