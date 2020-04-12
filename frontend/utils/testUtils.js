const testItem = () => ({
  id: Math.floor(Math.random() * Math.floor(10000000)),
  price: 5000,
  user: null,
  category: 'Shoes',
  images: ['dog.jpg', 'dog2.jpg'],
  title: 'This is a test title',
  description: 'This is a test description'
})

const testUser = () => ({
  id: Math.floor(Math.random() * Math.floor(10000000)),
  name: 'John',
  email: 'john_smith@gmail.com',
  permissions: ['ADMIN'],
  orders: [],
  cart: []
})

const testOrderItem = () => ({
  id: Math.floor(Math.random() * Math.floor(10000000)),
  title: 'This is a test title',
  price: 4234,
  description: 'This is a test description',
  quantity: 1,
  images: ['dog.jpg', 'dog2.jpg'],
  category: 'Shoes'
})

const testOrder = () => ({
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [testOrderItem(), testOrderItem()],
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  user: testUser()
})

const testCartItem = overrides => ({
  id: 'omg123',
  quantity: 3,
  item: testItem(),
  user: testUser(),
  ...overrides
})

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

export {
  LocalStorageMock,
  testItem,
  testUser,
  testCartItem,
  testOrder,
  testOrderItem
}
