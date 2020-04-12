import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import CheckIfSignedIn from './CheckIfSignedIn'
import { CURRENT_USER_QUERY } from '../User/User'
import { testUser } from '../../utils/testUtils'

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
]

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: testUser() } }
  }
]

describe('CheckIfSignedIn Component', () => {
  test('Renders sign in form for unauthenticated users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <CheckIfSignedIn />
      </MockedProvider>
    )

    await act(() => wait())

    wrapper.update()
    expect(wrapper.find('PleaseSignIn').length).toBe(1)
    const SignIn = wrapper.find('SignIn')
    expect(SignIn.exists()).toBe(true)
  })

  test('Renders the child component passed to it with a user logged in', async () => {
    const Hey = () => <p>Hey!</p>
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks} addTypename={false}>
        <CheckIfSignedIn>
          <Hey />
        </CheckIfSignedIn>
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    expect(wrapper.contains(<Hey />)).toBe(true)
  })
})
