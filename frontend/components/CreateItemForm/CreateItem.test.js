import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import Router from 'next/router'
import { MockedProvider } from '@apollo/react-testing'

import CreateItem, { CREATE_ITEM_MUTATION } from './CreateItemForm'
import { testItem } from '../../utils/testUtils'

describe('Create Item Component', () => {
  test('Changes values on typing', async () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
        <CreateItem />
      </MockedProvider>
    )

    wrapper
      .find('#title')
      .simulate('change', { target: { value: 'Testing', name: 'title' } })

    expect(wrapper.find('#title').prop('value')).toBe('Testing')

    wrapper.find('#price').simulate('change', {
      target: { value: 50000, name: 'price', type: 'number' }
    })

    expect(wrapper.find('#price').prop('value')).toBe(50000)

    wrapper.find('#description').simulate('change', {
      target: { value: 'This is a really nice item', name: 'description' }
    })

    expect(wrapper.find('#description').prop('value')).toBe(
      'This is a really nice item'
    )

    wrapper.find('#category').simulate('change', {
      target: { value: 'Shoes', name: 'category' }
    })

    expect(wrapper.find('#category').prop('value')).toBe('Shoes')
  })

  test('Creates an item when the form is submitted', async () => {
    const item = testItem()

    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            category: item.category,
            price: item.price,
            images: []
          }
        },
        result: {
          data: {
            createItem: {
              ...testItem,
              id: 'abc123'
            }
          }
        }
      }
    ]

    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateItem />
      </MockedProvider>
    )

    wrapper
      .find('#title')
      .simulate('change', { target: { value: item.title, name: 'title' } })

    wrapper.find('#price').simulate('change', {
      target: { value: item.price, name: 'price', type: 'number' }
    })

    wrapper.find('#description').simulate('change', {
      target: { value: item.description, name: 'description' }
    })

    wrapper.find('#category').simulate('change', {
      target: { value: item.category, name: 'category' }
    })

    Router.router = { push: jest.fn() }
    wrapper.find('form').simulate('submit')
    await act(() => wait(50))

    expect(Router.router.push).toHaveBeenCalled()
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/item',
      query: { id: 'abc123' }
    })
  })
})
