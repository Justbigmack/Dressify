import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import Router from 'next/router'

import DeleteButton, { DELETE_ITEM_MUTATION } from './DeleteButton'

window.confirm = jest.fn(() => true)

const mocks = [
  {
    request: {
      query: DELETE_ITEM_MUTATION,
      variables: { id: 12345 }
    },
    result: {
      data: { deleteItem: { id: 12345 } }
    }
  }
]

describe('DeleteButton component', () => {
  test('Renders the component and calls the function with no error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteButton id={12345}></DeleteButton>
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    Router.router = { push: jest.fn() }

    wrapper.simulate('click')
    expect(window.confirm).toBeCalled()
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/'
    })
  })
})
