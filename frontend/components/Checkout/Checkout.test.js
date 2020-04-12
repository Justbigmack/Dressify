import { act } from 'react-dom/test-utils'
import wait from 'waait'
import NProgress from 'nprogress'
import Router from 'next/router'

import { onToken } from '../Checkout/Checkout'

Router.router = { push() {} }

describe('Checkout Component', () => {
  test('Creates an order on token', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    })
    onToken({ id: 'abc123' }, createOrderMock)
    expect(createOrderMock).toHaveBeenCalled()
    expect(createOrderMock).toHaveBeenCalledWith({
      variables: { token: 'abc123' }
    })
  })

  test('Turns the progress bar on', async () => {
    NProgress.start = jest.fn()
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    })
    onToken({ id: 'abc123' }, createOrderMock)
    expect(NProgress.start).toHaveBeenCalled()
  })

  test('Routes to the order page when completed', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    })
    Router.router.push = jest.fn()
    onToken({ id: 'abc123' }, createOrderMock)
    await act(() => wait())
    expect(Router.router.push).toHaveBeenCalled()
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/order',
      query: {
        id: 'xyz789'
      }
    })
  })
})
