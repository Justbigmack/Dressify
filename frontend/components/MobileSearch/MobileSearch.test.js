import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import MobileSearch from './MobileSearch'

describe('MobileSearch Component', () => {
  test('Renders the search component with no errors', async () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
        <MobileSearch />
      </MockedProvider>
    )

    await act(() => wait())

    expect(wrapper.find('Search').length).toBe(1)
  })
})
