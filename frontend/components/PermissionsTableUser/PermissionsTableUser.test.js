import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import PermissionsTableUser, {
  UPDATE_PERMISSIONS_MUTATION
} from './PermissionsTableUser'

import { possiblePermissions } from '../../utils/possiblePermissions'

const user = {
  name: 'test',
  email: 'test@gmail.com',
  id: 'abc123',
  permissions: ['ADMIN']
}

const mocks = [
  {
    request: {
      query: UPDATE_PERMISSIONS_MUTATION,
      variables: {
        permissions: possiblePermissions,
        userId: 'abc123'
      }
    },
    result: {
      data: {
        updatePermissions: {
          id: 'abc123',
          userId: 'abc123',
          permissions: possiblePermissions,
          name: 'test',
          email: 'test@gmail.com'
        }
      }
    }
  }
]

describe('PermissionTableUser Component', () => {
  test('Renders the component with no error', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <table>
          <tbody>
            <PermissionsTableUser user={user} />
          </tbody>
        </table>
      </MockedProvider>
    )
  })

  test('Renders the component with correct permissions checked', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <table>
          <tbody>
            <PermissionsTableUser user={user} />
          </tbody>
        </table>
      </MockedProvider>
    )

    expect(wrapper.find('input[value="ADMIN"]').prop('checked')).toEqual(true)
    expect(wrapper.find('input[value="USER"]').prop('checked')).toEqual(false)
    expect(wrapper.find('input[value="ITEMCREATE"]').prop('checked')).toEqual(
      false
    )
    expect(wrapper.find('input[value="ITEMDELETE"]').prop('checked')).toEqual(
      false
    )
    expect(
      wrapper.find('input[value="PERMISSIONUPDATE"]').prop('checked')
    ).toEqual(false)
  })

  test('Updates permissions on request', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <table>
          <tbody>
            <PermissionsTableUser user={user} />
          </tbody>
        </table>
      </MockedProvider>
    )

    wrapper.find('input[name="USER"]').simulate('change', {
      target: {
        checked: true,
        value: 'USER'
      }
    })

    expect(wrapper.find('input[name="USER"]').prop('value')).toBe('USER')

    wrapper.find('input[name="ITEMCREATE"]').simulate('change', {
      target: {
        checked: true,
        value: 'ITEMCREATE'
      }
    })

    expect(wrapper.find('input[name="ITEMCREATE"]').prop('value')).toBe(
      'ITEMCREATE'
    )

    wrapper.find('input[name="ITEMUPDATE"]').simulate('change', {
      target: {
        checked: true,
        value: 'ITEMUPDATE'
      }
    })

    expect(wrapper.find('input[name="ITEMUPDATE"]').prop('value')).toBe(
      'ITEMUPDATE'
    )

    wrapper.find('input[name="ITEMDELETE"]').simulate('change', {
      target: {
        checked: true,
        value: 'ITEMDELETE'
      }
    })

    expect(wrapper.find('input[name="ITEMDELETE"]').prop('value')).toBe(
      'ITEMDELETE'
    )

    wrapper.find('input[name="PERMISSIONUPDATE"]').simulate('change', {
      target: {
        checked: true,
        value: 'PERMISSIONUPDATE'
      }
    })

    expect(wrapper.find('input[name="PERMISSIONUPDATE"]').prop('value')).toBe(
      'PERMISSIONUPDATE'
    )

    await act(() => wait(50))

    wrapper.find('Buttonstyles__Button').simulate('click')

    await act(() => wait(50))
    wrapper.update()

    expect(wrapper.find('ErrorMessage').length).toBe(0)
  })
})
