import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import Cart, { LS_CART_OPEN_QUERY } from './Cart'
import { CURRENT_USER_QUERY } from '../User/User'
import { REMOVE_FROM_CART_MUTATION } from '../RemoveFromCartButton/RemoveFromCartButton'
import { testUser, testCartItem } from '../../utils/testUtils'

const testItem = testCartItem()

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...testUser(),
          cart: [testItem]
        }
      }
    }
  },
  {
    request: { query: LS_CART_OPEN_QUERY },
    result: { data: { cartOpen: true } }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: { id: testItem.id }
    },
    result: {
      data: {
        removeFromCart: { id: testItem.id }
      }
    }
  }
]

describe('Cart Component', () => {
  test('Renders out and displays correct info', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Cart />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    expect(wrapper.find('p[data-test="cartText"]').text()).toEqual(
      'You Have 3 Items in Your Cart'
    )
    expect(wrapper.find('p[data-test="cartPrice"]').text()).toEqual('$150')
    expect(wrapper.find('CartItem')).toHaveLength(1)
  })

  test('Updates the cart when an item is removed', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Cart />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    wrapper.find(`RemoveFromCartButton[id="${testItem.id}"]`).simulate('click')

    await act(() => wait())
    wrapper.update()

    expect(wrapper.find('p[data-test="cartText"]').text()).toEqual(
      'You Have 0 Items in Your Cart'
    )
    expect(wrapper.find('p[data-test="cartPrice"]').text()).toEqual('$0')
    expect(wrapper.find('CartItem')).toHaveLength(0)
  })
})
