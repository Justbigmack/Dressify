import { shallow } from 'enzyme'

import Item from './Item'

const testItem = {
  id: 'ABC123',
  title: 'A Test Item',
  price: 4000,
  description: 'This is a test item!',
  category: 'Shoes',
  images: ['dog.jpg'],
  largeImage: 'largedog.jpg'
}

describe('Item Component', () => {
  test('Item component renders the image properly', () => {
    const wrapper = shallow(<Item item={testItem} />)
    const img = wrapper.find('img')

    expect(img.props().src).toBe(testItem.images[0])
    expect(img.props().alt).toBe(testItem.title)
  })

  test('Item component renders the summary with price, category and product name', () => {
    const wrapper = shallow(<Item item={testItem} />)
    const Title = wrapper.find('Itemstyles__ItemCardTitle')
    const Category = wrapper.find('Itemstyles__ItemCardCategory')
    const ItemCardPrice = wrapper.find('Itemstyles__ItemCardPrice')

    expect(Title.children().text()).toBe(testItem.title)
    expect(Category.children().text()).toBe(testItem.category)
    expect(ItemCardPrice.children().text()).toBe('$40')
  })
})
