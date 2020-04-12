import { shallow } from 'enzyme'

import Meta from './Meta'

describe('Meta Component', () => {
  test('Has correct parameters', () => {
    const wrapper = shallow(<Meta />)

    expect(wrapper.find('meta').length).toEqual(2)
    expect(wrapper.find('link[rel="shortcut icon"]').prop('href')).toBe(
      '/favicon.png'
    )
    expect(wrapper.find('link[rel="stylesheet"]').prop('href')).toBe(
      '/nprogress.css'
    )
    expect(wrapper.find('title').text()).toEqual('AndrewK Shop')
  })
})
