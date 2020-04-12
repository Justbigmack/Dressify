import { shallow } from 'enzyme'

import Page from './Page'

describe('Page Component', () => {
  test('Renders correct components', () => {
    const wrapper = shallow(<Page />)

    expect(wrapper.find('ThemeProvider').length).toBe(1)
    expect(wrapper.find('Meta').length).toBe(1)
    expect(wrapper.find('Header').length).toBe(1)
    expect(wrapper.find('Pagestyles__Inner').length).toBe(1)
  })
})
