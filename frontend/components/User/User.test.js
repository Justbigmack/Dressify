import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import { testUser } from '../../utils/testUtils.js'
import User, { CURRENT_USER_QUERY } from './User'

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: testUser()
      }
    }
  }
]

describe('User Component', () => {
  test('Renders the spinner on loading', async () => {
    const wrapper = mount(
      <MockedProvider>
        <User>{() => <p>I am a test</p>}</User>
      </MockedProvider>
    )

    await act(() => wait())

    expect(wrapper.find('Spinner').length).toBe(1)
  })

  test('Renders the component and its children when loaded', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <User>{() => <p>I am a test</p>}</User>
      </MockedProvider>
    )

    await act(() => wait(100))
    wrapper.update()

    expect(wrapper.find('p').text()).toBe('I am a test')
  })
})
