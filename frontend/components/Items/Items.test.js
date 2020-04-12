import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import { ALL_ITEMS_QUERY } from './Items'
import Items from './Items'
import { testItem } from '../../utils/testUtils'

const mocks = [
  {
    request: { query: ALL_ITEMS_QUERY, variables: { skip: 0, first: 9 } },
    result: {
      data: { items: [testItem(), testItem(), testItem()], me: null }
    }
  }
]

describe('Items component', () => {
  test('Renders the component and displays items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Items page={1}></Items>
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    expect(wrapper.find('Item').length).toEqual(3)
  })
})
