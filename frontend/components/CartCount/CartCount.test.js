import { shallow } from 'enzyme'
import CartCount from './CartCount'

describe('CartCount Component', () => {
  test('Component renders the correct count', () => {
    const wrapper = shallow(<CartCount count={10} />)
    const count = wrapper.find('CartCountstyles__CartCountStyles')
    expect(count.children().text()).toBe('10')
  })
})
