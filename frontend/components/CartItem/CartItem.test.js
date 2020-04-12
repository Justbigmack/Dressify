import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'

import { REMOVE_FROM_CART_MUTATION } from '../RemoveFromCartButton/RemoveFromCartButton'
import CartItem from './CartItem'
import { testCartItem } from '../../utils/testUtils'

describe('CartItemComponent', () => {
  test('Renders the component properly and displays correct data', async () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
        <CartItem cartItem={testCartItem()} />
      </MockedProvider>
    )

    const image = wrapper.find('img')
    expect(image.prop('src')).toEqual('dog.jpg')
    expect(image.prop('alt')).toEqual('This is a test title')

    const title = wrapper.find('p.cart-item-title')
    expect(title.text()).toEqual('This is a test title x 3')

    const category = wrapper.find('p.cart-item-category')
    expect(category.text()).toEqual('Shoes')

    const price = wrapper.find('p.cart-item-price')
    expect(price.text()).toEqual('$150')
  })
})
