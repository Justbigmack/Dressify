import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import Nav from './Nav'
import { CURRENT_USER_QUERY } from '../User/User'
import { testUser, testCartItem } from '../../utils/testUtils'

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

describe('Nav Component', () => {
  test('Renders a min version of nav when logged out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <Nav />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    const nav = wrapper.find('ul[data-test="nav"]')
    expect(nav.children().length).toBe(2)
    expect(nav.text()).toContain('ShopSign In')
  })

  test('Renders a full version of nav when logged in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks} addTypename={false}>
        <Nav />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    const nav = wrapper.find('ul[data-test="nav"]')
    expect(nav.children().length).toBe(5)
    expect(nav.text()).toContain('ShopSellOrdersSign OutMy Cart0')
  })
})
