import { mount } from 'enzyme'

import ErrorMessage from './ErrorMessage'

describe('ErrorMessage Component', () => {
  test('It does not render anything with a null error', () => {
    const wrapper = mount(<ErrorMessage error={null} />)
    expect(wrapper.text()).toEqual('')
  })

  test('It displays the error component with the error message', () => {
    const error = new Error('Test Error')
    const wrapper = mount(<ErrorMessage error={error} />)
    expect(wrapper.text()).toEqual('Error occured: Test Error')
  })
})
