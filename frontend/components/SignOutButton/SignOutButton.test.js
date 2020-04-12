import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import { ApolloConsumer } from 'react-apollo'

import { CURRENT_USER_QUERY } from '../User/User'
import SignOutButton, { SIGN_OUT_MUTATION } from './SignOutButton'
import { testUser } from '../../utils/testUtils'

const type = (wrapper, name, value) =>
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value }
  })

const me = testUser()
const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  },
  {
    request: {
      query: SIGN_OUT_MUTATION
    },
    result: {
      data: {
        signOut: {
          message: 'You have signed out'
        }
      }
    }
  }
]

describe('SignOutButton Component', () => {
  test('Calls the mutation properly', async () => {
    let apolloClient

    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {client => {
            apolloClient = client
            return <SignOutButton />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    const user = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(user.data.me).toMatchObject(me)
    wrapper.find('button').simulate('click')

    await act(() => wait(50))

    const user2 = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(user2.data.me).toBe(null)
  })
})
