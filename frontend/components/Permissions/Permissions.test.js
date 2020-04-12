import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import Permissions, { ALL_USERS_QUERY } from './Permissions'

const mocks = [
  {
    request: {
      query: ALL_USERS_QUERY
    },
    result: {
      data: {
        users: [
          {
            id: 'abc123',
            name: 'test',
            email: 'test@gmail.com',
            permissions: ['ADMIN']
          }
        ]
      }
    }
  }
]

describe('Permissions Component', () => {
  test('Renders the component with no errors', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Permissions />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
  })

  test('Renders the table correctly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Permissions />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    expect(wrapper.find('PermissionsTableUser').length).toBe(1)
    expect(wrapper.find('th').length).toBe(8)
  })
})
