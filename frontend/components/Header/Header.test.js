import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'

import Header from './Header'

describe('Header Component', () => {
  test('Renders the header with correct components', () => {
    const wrapper = mount(
      <MockedProvider>
        <Header />
      </MockedProvider>
    )

    expect(wrapper.find('img.logo').length).toEqual(1)
    expect(wrapper.find('Nav').length).toEqual(1)
    expect(wrapper.find('Search').length).toEqual(0)
  })
})
