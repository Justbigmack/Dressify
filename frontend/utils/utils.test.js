import formatMoney from './calcUtils'

describe('Utility functions work', () => {
  test('formatMoney function converts money', () => {
    expect(formatMoney(1)).toEqual('$0.01')
    expect(formatMoney(10)).toEqual('$0.10')
    expect(formatMoney(5066)).toEqual('$50.66')
    expect(formatMoney(-1000)).toEqual('-$10')
  })
})
