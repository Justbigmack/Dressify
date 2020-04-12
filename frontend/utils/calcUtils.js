export const calcTotalPrice = cart =>
  cart.reduce((total, cartItem) => {
    if (!cartItem.item) return total
    return total + cartItem.quantity * cartItem.item.price
  }, 0)

export const calcItems = cart =>
  cart.reduce((total, cartItem) => total + cartItem.quantity, 0)

export default amount => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }

  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0

  const formatter = new Intl.NumberFormat('en-US', options)

  return formatter.format(amount / 100)
}
