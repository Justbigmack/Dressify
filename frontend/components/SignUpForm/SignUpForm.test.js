import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import { ApolloConsumer } from 'react-apollo'

import { CURRENT_USER_QUERY } from '../User/User'
import Signup, { SIGNUP_MUTATION } from './SignUpForm'
import { testUser } from '../../utils/testUtils'

const type = (wrapper, name, value) =>
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value }
  })

const me = testUser()
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: '12345'
      }
    },
    result: {
      data: {
        signUp: {
          id: 'abc123',
          email: me.email,
          name: me.name
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
]

describe('SignUpForm Component', () => {
  test('Calls the mutation properly', async () => {
    let apolloClient

    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return <Signup />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    type(wrapper, 'name', me.name)
    type(wrapper, 'email', me.email)
    type(wrapper, 'password', '12345')
    wrapper.update()
    wrapper.find('form').simulate('submit')
    await act(() => wait())

    const user = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(user.data.me).toMatchObject(me)
  })
})
