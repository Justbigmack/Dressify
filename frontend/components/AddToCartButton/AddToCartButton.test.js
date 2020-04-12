import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import { ApolloConsumer } from '@apollo/client'

import AddToCartButton, {
  ADD_TO_CART_MUTATION
} from '../AddToCartButton/AddToCartButton'
import { CURRENT_USER_QUERY } from '../User/User'
import { testUser, testCartItem } from '../../utils/testUtils'

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...testUser(),
          cart: []
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...testUser(),
          cart: [testCartItem()]
        }
      }
    }
  },
  {
    request: { query: ADD_TO_CART_MUTATION, variables: { id: 'abc123' } },
    result: {
      data: {
        addToCart: {
          ...testCartItem(),
          quantity: 1
        }
      }
    }
  }
]

describe('AddToCartButton Component', () => {
  test('Adds an item to cart when clicked', async () => {
    let apolloClient

    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return <AddToCartButton id="abc123" />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    await act(() => wait())
    wrapper.update()

    const res = await apolloClient.query({ query: CURRENT_USER_QUERY })
    const me = res.data.me
    expect(me.cart).toHaveLength(0)
    wrapper.find('button').simulate('click')
    await act(() => wait(50))

    const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY })
    const me2 = res2.data.me
    expect(me2.cart).toHaveLength(1)
    expect(me2.cart[0].id).toBe('omg123')
    expect(me2.cart[0].quantity).toBe(3)
  })

  test('Changes text when clicked', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddToCartButton id="abc123" />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    expect(wrapper.text()).toContain('Add to Cart')
    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toContain('Adding to Cart')
  })
})
