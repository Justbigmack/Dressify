import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import { ApolloConsumer } from 'react-apollo'
import Router from 'next/router'

import { CURRENT_USER_QUERY } from '../User/User'
import SignInForm, { SIGNIN_MUTATION } from './SignInForm'
import { testUser } from '../../utils/testUtils'

const type = (wrapper, name, value) =>
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value }
  })

const me = testUser()
const mocks = [
  {
    request: {
      query: SIGNIN_MUTATION,
      variables: {
        email: me.email,
        password: '12345'
      }
    },
    result: {
      data: {
        signIn: {
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

describe('SignInForm Component', () => {
  test('Calls the mutation properly', async () => {
    let apolloClient

    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return <SignInForm />
          }}
        </ApolloConsumer>
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    Router.router = { push: jest.fn() }

    type(wrapper, 'email', me.email)
    type(wrapper, 'password', '12345')
    wrapper.update()
    wrapper.find('form').simulate('submit')
    await act(() => wait())

    const user = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(user.data.me).toMatchObject(me)

    expect(Router.router.push).toHaveBeenCalled()
  })
})
