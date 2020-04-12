import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'
import Router from 'next/router'

import UpdateItem, {
  SINGLE_ITEM_QUERY,
  UPDATE_ITEM_MUTATION
} from './UpdateItemForm.jsx'

const mocks = [
  {
    request: { query: SINGLE_ITEM_QUERY, variables: { id: 'abc123' } },
    result: {
      data: {
        item: {
          id: 'abc123',
          title: 'Test Title',
          description: 'Test Description',
          category: 'Shoes',
          price: 5000
        }
      }
    }
  },
  {
    request: {
      query: UPDATE_ITEM_MUTATION,
      variables: {
        id: 'abc123',
        title: 'Test Title 2',
        description: 'Test Description 2',
        category: 'Accessories',
        price: 50000
      }
    },
    result: {
      data: {
        updateItem: {
          id: 'abc123',
          title: 'Test Title 2',
          description: 'Test Description 2',
          category: 'Accessories',
          price: 50000
        }
      }
    }
  }
]

describe('UpdateItemForm Component', () => {
  test('Renders the form with no errors', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateItem id="abc123" />
      </MockedProvider>
    )
  })

  test('Renders the form with correct default props', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateItem id="abc123" />
      </MockedProvider>
    )

    await act(() => wait(50))
    wrapper.update()

    expect(wrapper.find('#title').prop('defaultValue')).toEqual(
      mocks[0].result.data.item.title
    )
    expect(wrapper.find('#price').prop('defaultValue')).toEqual(
      mocks[0].result.data.item.price
    )
    expect(wrapper.find('#description').prop('defaultValue')).toEqual(
      mocks[0].result.data.item.description
    )
    expect(wrapper.find('#category').prop('defaultValue')).toEqual(
      mocks[0].result.data.item.category
    )
  })
})

test('Submits the form and rerouts the user to the updated item', async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UpdateItem id="abc123" />
    </MockedProvider>
  )

  await act(() => wait(50))
  wrapper.update()

  Router.router = { push: jest.fn() }

  wrapper.find('#title').simulate('change', {
    target: { value: mocks[1].result.data.updateItem.title, name: 'title' }
  })

  wrapper.find('#price').simulate('change', {
    target: {
      value: mocks[1].result.data.updateItem.price,
      name: 'price',
      type: 'number'
    }
  })

  wrapper.find('#description').simulate('change', {
    target: {
      value: mocks[1].result.data.updateItem.description,
      name: 'description'
    }
  })

  wrapper.find('#category').simulate('change', {
    target: {
      value: mocks[1].result.data.updateItem.category,
      name: 'category'
    }
  })

  wrapper.find('form').simulate('submit')

  await act(() => wait(100))

  expect(Router.router.push).toHaveBeenCalled()
  expect(Router.router.push).toHaveBeenCalledWith({
    pathname: '/item',
    query: { id: 'abc123' }
  })
})
