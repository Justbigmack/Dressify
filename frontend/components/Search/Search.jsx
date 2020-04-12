import React, { useReducer } from 'react'
import Router from 'next/router'
import { ApolloConsumer } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import NProgress from 'nprogress'
import debounce from 'lodash.debounce'

import formatMoney from '../../utils/calcUtils'
import Spinner from '../Spinner/Spinner'
import SearchIcon from '../../public/icons/search.svg'
import {
  Dropdown,
  DropdownItem,
  DropdownItemInfo,
  SearchStyles,
  SearchInputContainer
} from './Search.styles'

export const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      images
      title
      category
      price
    }
  }
`

const routeToItem = (item) => {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id
    }
  })
}

const Search = ({ onBlurFunc = null }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    { items: [], active: false, searchQuery: '', searching: false }
  )

  const onChange = debounce(async (e, client) => {
    if (e.target.value === '') {
      setState({ items: [], active: false })
      return
    } else {
      NProgress.start()
      setState({ active: true, searching: true, items: [] })
      const res = await client.query({
        query: SEARCH_ITEMS_QUERY,
        variables: { searchTerm: e.target.value }
      })
      setState({
        items: res.data.items,
        searchQuery: e.target.value,
        searching: false
      })
      NProgress.done()
    }
  }, 300)

  const { items, active, searchQuery, searching } = state

  return (
    <SearchStyles>
      <div>
        <ApolloConsumer>
          {(client) => (
            <SearchInputContainer>
              <SearchIcon />
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search"
                autoComplete="off"
                onChange={(e) => {
                  e.persist()
                  onChange(e, client)
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (onBlurFunc) onBlurFunc()
                    setState({
                      items: [],
                      active: false
                    })
                  }, 150)
                }}
              />
            </SearchInputContainer>
          )}
        </ApolloConsumer>

        {active && (
          <Dropdown>
            {items.length > 0 &&
              items.map((item) => (
                <DropdownItem
                  data-test="DropdownItem"
                  key={item.id}
                  onClick={() => {
                    routeToItem(item)
                    setState({
                      items: [],
                      active: false,
                      searchQuery: '',
                      searching: false
                    })
                  }}
                >
                  <img src={item.images[0]} alt={item.title} />
                  <DropdownItemInfo>
                    <p>{item.title}</p>
                    <p>{item.category}</p>
                    <p>{formatMoney(item.price)}</p>
                  </DropdownItemInfo>
                </DropdownItem>
              ))}
            {!items.length && active && !searching && (
              <DropdownItem>Nothing found for {searchQuery}</DropdownItem>
            )}
            {active && searching && (
              <DropdownItem>
                <Spinner />
              </DropdownItem>
            )}
          </Dropdown>
        )}
      </div>
    </SearchStyles>
  )
}

export default Search
