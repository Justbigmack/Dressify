import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import wait from 'waait'
import { MockedProvider } from '@apollo/react-testing'

import { testItem } from '../../utils/testUtils'
import SingleItem, { SINGLE_ITEM_QUERY } from '../SingleItem/SingleItem'

describe('SingleItem Component', () => {
  test('renders with correct data', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: {
          data: {
            item: testItem()
          }
        }
      }
    ]

    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleItem id="123" />
      </MockedProvider>
    )

    expect(wrapper.find('Spinner').length).toBe(1)
    await act(() => wait())
    wrapper.update()
  })

  test('Error with invalid item', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: {
          errors: [{ message: 'Item Not Found!' }]
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleItem id="123" />
      </MockedProvider>
    )
    await act(() => wait())
    wrapper.update()
    const item = wrapper.find('[data-test="graphql-error"]')
    expect(item.text()).toContain('Item Not Found!')
  })
})
