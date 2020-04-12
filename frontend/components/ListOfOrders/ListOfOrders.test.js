import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import ListOfOrders, { USER_ORDERS_QUERY } from './ListOfOrders.jsx'

const mocks = [
  {
    request: {
      query: USER_ORDERS_QUERY
    },
    result: {
      data: {
        orders: [
          {
            id: 'abc123',
            total: 10000,
            createdAt: '2020-03-17T18:44:35.494Z',
            items: [
              {
                id: 'abc123',
                title: 'This is a test title',
                price: 10000,
                description: 'This is a test description',
                quantity: 1,
                images: ['dog.jpg']
              }
            ]
          }
        ]
      }
    }
  }
]

describe('ListOfOrders Component', () => {
  test('Renders the component with correct data', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListOfOrders />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    expect(wrapper.find('h2').text()).toEqual('Your Order History')
    expect(wrapper.find('ListOfOrdersstyles__OrderItemStyles').length).toBe(1)

    expect(
      wrapper
        .find('ListOfOrdersstyles__OrderLightGreyText[data-test="orderId"]')
        .text()
    ).toBe('abc123')

    expect(
      wrapper
        .find('ListOfOrdersstyles__OrderBoldText[data-test="itemTitle"]')
        .text()
    ).toBe('This is a test title')

    expect(
      wrapper
        .find('ListOfOrdersstyles__OrderUsualText[data-test="orderDate"]')
        .text()
    ).toBe('17 Mar 2020')

    expect(
      wrapper
        .find(
          'ListOfOrdersstyles__OrderUsualText[data-test="orderNumberOfItems"]'
        )
        .text()
    ).toBe('1')

    expect(
      wrapper
        .find(
          'ListOfOrdersstyles__OrderUsualText[data-test="orderNumberOfProducts"]'
        )
        .text()
    ).toBe('1')
    expect(
      wrapper
        .find('ListOfOrdersstyles__OrderBoldText[data-test="orderPrice"]')
        .text()
    ).toBe('$100')

    expect(
      wrapper
        .find('ListOfOrdersstyles__OrderSuccessText[data-test="orderStatus"]')
        .text()
    ).toBe('Success')
  })
})
