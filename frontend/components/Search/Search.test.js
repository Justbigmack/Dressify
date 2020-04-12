import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import Search, { SEARCH_ITEMS_QUERY } from './Search'

const mocks = [
  {
    request: { query: SEARCH_ITEMS_QUERY, variables: { searchTerm: 'test' } },
    result: {
      data: {
        items: [
          {
            id: 'abc123',
            images: ['dogs.jpg'],
            title: 'test item',
            category: 'test category',
            price: 5000
          }
        ]
      }
    }
  }
]

describe('Search Component', () => {
  test('Renders the component with no error', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search></Search>
      </MockedProvider>
    )
  })

  test('Displays the correct search result on entering a value', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search />
      </MockedProvider>
    )

    wrapper.find('#search').simulate('change', {
      target: {
        value: 'test',
        name: 'search'
      }
    })

    await act(() => wait(400))

    wrapper.update()

    expect(wrapper.find('div[data-test="DropdownItem"]').length).toEqual(1)
    expect(wrapper.find('img').prop('src')).toEqual(
      mocks[0].result.data.items[0].images[0]
    )
    expect(wrapper.find('img').prop('alt')).toEqual(
      mocks[0].result.data.items[0].title
    )
    expect(wrapper.find('div[data-test="DropdownItem"]').text()).toEqual(
      'test itemtest category$50'
    )
  })
})
