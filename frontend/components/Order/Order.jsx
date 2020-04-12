import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { format, parseISO } from 'date-fns'
import Head from 'next/head'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import formatMoney from '../../utils/calcUtils'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import OrderStyles from './Order.styles'

export const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        images
        quantity
      }
    }
  }
`

const Order = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id }
  })

  if (error)
    return <ErrorMessage error={new Error('Could not load the order')} margin />
  if (loading) return <Spinner margin />
  const order = data.order

  return (
    <OrderStyles>
      <Head>
        <title>Order {order.id}</title>
      </Head>
      <p data-test="orderID">
        <span>Order ID:</span>
        <span>{id}</span>
      </p>
      <p data-test="orderCharge">
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p data-test="orderDate">
        <span>Date:</span>
        <span>
          {format(parseISO(order.createdAt), 'MMMM d, yyyy h:mm a', {
            awareOfUnicodeTokens: true
          })}
        </span>
      </p>
      <p data-test="orderTotal">
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p data-test="orderCount">
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.images[0]} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  )
}

Order.propTypes = {
  id: PropTypes.string.isRequired
}

export default Order
