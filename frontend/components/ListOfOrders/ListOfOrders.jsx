import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import gql from 'graphql-tag'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import formatMoney from '../../utils/calcUtils'
import Spinner from '../Spinner/Spinner'
import {
  OrderUnorderedList,
  OrderItemStyles,
  ListOfOrdersStyles,
  OrderInfoContainer,
  OrderLeftContainer,
  OrderRightContainer,
  OrderLeftTextContainer,
  OrderRightTextContainer,
  OrderProductNames,
  OrderLightGreyText,
  OrderBoldText,
  OrderUsualText,
  OrderSuccessText
} from './ListOfOrders.styles'

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        images
      }
    }
  }
`

const ListOfOrders = () => {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY)
  if (loading) return <Spinner margin />
  if (error)
    return (
      <ErrorMessage error={new Error('Could not load your orders')} margin />
    )

  const orders = data.orders
  return (
    <OrderUnorderedList>
      <h2>Your Order History</h2>

      {orders.length > 0 &&
        orders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id }
              }}
            >
              <a>
                <ListOfOrdersStyles>
                  <OrderInfoContainer>
                    <OrderLeftContainer>
                      <OrderLeftTextContainer>
                        <OrderLightGreyText data-test="orderId">
                          {order.id}
                        </OrderLightGreyText>
                        <OrderProductNames>
                          {order.items.map((item) => (
                            <OrderBoldText
                              key={item.title}
                              data-test="itemTitle"
                            >
                              {item.title}
                            </OrderBoldText>
                          ))}
                        </OrderProductNames>
                      </OrderLeftTextContainer>
                    </OrderLeftContainer>
                    <OrderRightContainer>
                      <OrderRightTextContainer>
                        <OrderLightGreyText>ORDERED ON</OrderLightGreyText>
                        <OrderUsualText data-test="orderDate">
                          {format(parseISO(order.createdAt), 'd MMM yyyy', {
                            awareOfUnicodeTokens: true
                          })}
                        </OrderUsualText>
                      </OrderRightTextContainer>
                      <OrderRightTextContainer>
                        <OrderLightGreyText>STATUS</OrderLightGreyText>
                        <OrderSuccessText data-test="orderStatus">
                          Success
                        </OrderSuccessText>
                      </OrderRightTextContainer>
                    </OrderRightContainer>
                  </OrderInfoContainer>
                  <OrderInfoContainer>
                    <OrderLeftContainer>
                      <OrderLeftTextContainer>
                        <OrderLightGreyText>NO. OF ITEMS</OrderLightGreyText>
                        <OrderUsualText data-test="orderNumberOfItems">
                          {order.items.reduce((a, b) => a + b.quantity, 0)}
                        </OrderUsualText>
                      </OrderLeftTextContainer>
                      <OrderLeftTextContainer>
                        <OrderLightGreyText>NO. OF PRODUCTS</OrderLightGreyText>
                        <OrderUsualText data-test="orderNumberOfProducts">
                          {order.items.length}
                        </OrderUsualText>
                      </OrderLeftTextContainer>
                    </OrderLeftContainer>
                    <OrderRightContainer>
                      <OrderRightTextContainer>
                        <OrderLightGreyText>PRICE</OrderLightGreyText>
                        <OrderBoldText data-test="orderPrice">
                          {formatMoney(order.total)}
                        </OrderBoldText>
                      </OrderRightTextContainer>
                    </OrderRightContainer>
                  </OrderInfoContainer>
                </ListOfOrdersStyles>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      {orders.length < 1 && !loading && (
        <h3>You currently have no orders. Go buy something!</h3>
      )}
    </OrderUnorderedList>
  )
}

export default ListOfOrders
