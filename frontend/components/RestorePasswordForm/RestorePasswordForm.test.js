import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import RequestReset, { REQUEST_RESET_MUTATION } from './RestorePasswordForm'

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'andrewtest@gmail.com' }
    },
    result: {
      data: { requestReset: { message: 'success' } }
    }
  }
]

describe('RestorePasswordForm Component', () => {
  test('Calls the mutation', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RequestReset />
      </MockedProvider>
    )

    wrapper.find('input').simulate('change', {
      target: { name: 'email', value: 'andrewtest@gmail.com' }
    })
    wrapper.find('form').simulate('submit')

    await act(() => wait())
    wrapper.update()
    expect(wrapper.find('p').text()).toContain('Success! Check your email!')
  })
})
