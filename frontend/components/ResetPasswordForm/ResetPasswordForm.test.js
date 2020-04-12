import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import { CURRENT_USER_QUERY } from '../User/User'
import ResetPasswordForm, { RESET_MUTATION } from './ResetPasswordForm'
import { testUser } from '../../utils/testUtils'

const me = testUser()

const mocks = [
  {
    request: {
      query: RESET_MUTATION,
      variables: {
        resetToken: 'abc',
        password: '12345',
        confirmPassword: '12345'
      }
    },
    result: {
      data: {
        resetPassword: {
          id: 'abc123',
          email: 'test@gmail.com',
          name: 'test'
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
]

describe('ResetPasswordForm Component', () => {
  test('Renders the component with no error', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPasswordForm resetToken="abc" />
      </MockedProvider>
    )
  })

  test('Resets password on form submission and logs the user in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPasswordForm resetToken="abc" />
      </MockedProvider>
    )

    wrapper.find('input[name="password"]').simulate('change', {
      target: { name: 'password', value: '12345' }
    })

    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: { name: 'confirmPassword', value: '12345' }
    })

    wrapper.find('form').simulate('submit')

    await act(() => wait())
    wrapper.update()

    expect(wrapper.find('p').text()).toEqual('Success! You are now logged in!')
  })
})
