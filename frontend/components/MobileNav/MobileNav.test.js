import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import MobileNav from './MobileNav'

describe('MobileNav Component', () => {
  test('Renders the component with no errors', async () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
        <MobileNav />
      </MockedProvider>
    )

    await act(() => wait())

    expect(wrapper.find('MobileNavstyles__MobileNavStyles').length).toBe(1)
    expect(wrapper.find('Link[href="/items"]').length).toBe(1)
    expect(wrapper.find('Link[href="/signin"]').length).toBe(1)
  })
})
