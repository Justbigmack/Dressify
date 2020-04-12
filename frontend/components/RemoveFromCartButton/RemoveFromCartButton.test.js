import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import { ApolloConsumer } from 'react-apollo'

import RemoveFromCartButton, {
  REMOVE_FROM_CART_MUTATION
} from '../RemoveFromCartButton/RemoveFromCartButton'
import { CURRENT_USER_QUERY } from '../User/User'
import { testUser, testCartItem } from '../../utils/testUtils'

global.alert = console.log

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...testUser(),
          cart: [testCartItem({ id: 'abc123' })]
        }
      }
    }
  },
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: 'abc123' } },
    result: {
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: 'abc123'
        }
      }
    }
  }
]

describe('RemoveFromCartButton C omponent', () => {
  test('removes the item from cart', async () => {
    let apolloClient
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <RemoveFromCartButton id="abc123" />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(res.data.me.cart).toHaveLength(1)
    expect(res.data.me.cart[0].item.price).toBe(5000)
    wrapper.find('button').simulate('click')
    await act(() => wait())
    const res2 = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(res2.data.me.cart).toHaveLength(0)
  })
})
