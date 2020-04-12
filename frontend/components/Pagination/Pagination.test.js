import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import Router from 'next/router'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import Pagination, { PAGINATION_QUERY } from './Pagination'

Router.router = {
  push() {},
  prefetch() {}
}

const makeMocksFor = length => [
  {
    request: { query: PAGINATION_QUERY },
    result: {
      data: {
        itemsConnection: {
          aggregate: {
            count: length
          }
        }
      }
    }
  }
]

describe('Pagination Component', () => {
  test('Does not display anything on loading', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)} addTypename={false}>
        <Pagination page={1} />
      </MockedProvider>
    )

    expect(wrapper.text()).toContain('')
  })

  test('Renders 6 pages for 54 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(54)} addTypename={false}>
        <Pagination page={3} />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()

    expect(wrapper.find('Paginationstyles__CurrentPage').text()).toEqual('3')
  })

  test('Disables prev button on first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(54)} addTypename={false}>
        <Pagination page={1} />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    expect(wrapper.find('a[data-test="prev"]').prop('aria-disabled')).toEqual(
      true
    )
    expect(wrapper.find('a[data-test="next"]').prop('aria-disabled')).toEqual(
      false
    )
  })

  test('Disables next button on last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(54)} addTypename={false}>
        <Pagination page={6} />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    expect(wrapper.find('a[data-test="prev"]').prop('aria-disabled')).toEqual(
      false
    )
    expect(wrapper.find('a[data-test="next"]').prop('aria-disabled')).toEqual(
      true
    )
  })

  test('Enables all buttons on a middle page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(54)} addTypename={false}>
        <Pagination page={3} />
      </MockedProvider>
    )

    await act(() => wait())
    wrapper.update()
    expect(wrapper.find('a[data-test="prev"]').prop('aria-disabled')).toEqual(
      false
    )
    expect(wrapper.find('a[data-test="next"]').prop('aria-disabled')).toEqual(
      false
    )
  })
})
