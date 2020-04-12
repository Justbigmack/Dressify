import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import Order, { SINGLE_ORDER_QUERY } from './Order'
import { testOrder } from '../../utils/testUtils'

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: 'ord123' } },
    result: { data: { order: testOrder() } }
  }
]

describe('Order Component', () => {
  test('Renders the order component with correct data', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Order id="ord123" />
      </MockedProvider>
    )
    await act(() => wait())
    wrapper.update()

    const orderID = wrapper.find('p[data-test="orderID"]')
    expect(orderID.text()).toEqual('Order ID:ord123')

    const orderCharge = wrapper.find('p[data-test="orderCharge"]')
    expect(orderCharge.text()).toEqual('Charge:ch_123')

    const orderDate = wrapper.find('p[data-test="orderDate"]')
    expect(orderDate.text()).toEqual('Date:April 1, 2018 3:00 AM')

    const orderTotal = wrapper.find('p[data-test="orderTotal"]')
    expect(orderTotal.text()).toEqual('Order Total:$400')

    const orderCount = wrapper.find('p[data-test="orderCount"]')
    expect(orderCount.text()).toEqual('Item Count:2')

    const orderItems = wrapper.find('div.items')
    expect(orderItems.children().length).toEqual(2)
  })
})
