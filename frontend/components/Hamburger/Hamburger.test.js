import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import Hamburger, { TOGGLE_MOBILE_MENU_MUTATION } from './Hamburger'
import { LS_MOBILE_MENU_OPEN_QUERY } from '../MobileNav/MobileNav'

const mocks = [
  {
    request: { query: LS_MOBILE_MENU_OPEN_QUERY },
    result: {
      data: {
        mobileMenuOpen: false
      }
    }
  },
  {
    request: { query: TOGGLE_MOBILE_MENU_MUTATION },
    result: { data: { mobileMenuOpen: true } }
  }
]

describe('Hamburger Component', () => {
  test('Renders the component correctly', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Hamburger />
      </MockedProvider>
    )

    await act(() => wait())

    expect(wrapper.find('div[className="menuToggle"]').length).toBe(1)
    expect(wrapper.find('span').length).toBe(3)
  })
})
