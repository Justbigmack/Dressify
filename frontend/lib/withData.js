import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

import { endpoint, prodEndpoint } from '../config'
import { LS_CART_OPEN_QUERY } from '../components/Cart/Cart'
import { LS_MOBILE_SEARCH_OPEN_QUERY } from '../components/MobileSearch/MobileSearch'
import { LS_MOBILE_MENU_OPEN_QUERY } from '../components/MobileNav/MobileNav'

const createClient = ({ headers }) => {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    cache: new InMemoryCache(),
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    },
    // local state
    clientState: {
      resolvers: [
        {
          Mutation: {
            toggleCart(_, variables, { cache }) {
              const { cartOpen } = cache.readQuery({
                query: LS_CART_OPEN_QUERY
              })
              const data = {
                data: { cartOpen: !cartOpen }
              }
              cache.writeData(data)
              return data
            }
          }
        },
        {
          Mutation: {
            toggleMobileSearch(_, variables, { cache }) {
              const { mobileSearchOpen } = cache.readQuery({
                query: LS_MOBILE_SEARCH_OPEN_QUERY
              })
              const data = {
                data: { mobileSearchOpen: !mobileSearchOpen }
              }
              cache.writeData(data)
              return data
            }
          }
        },
        {
          Mutation: {
            toggleMobileMenu(_, variables, { cache }) {
              const { mobileMenuOpen } = cache.readQuery({
                query: LS_MOBILE_MENU_OPEN_QUERY
              })
              const data = {
                data: { mobileMenuOpen: !mobileMenuOpen }
              }
              cache.writeData(data)
              return data
            }
          }
        }
      ],
      defaults: {
        cartOpen: false,
        mobileSearchOpen: false,
        mobileMenuOpen: false
      }
    }
  })
}

export default withApollo(createClient)
