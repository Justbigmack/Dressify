import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Item from '../Item/Item'
import Pagination from '../Pagination/Pagination'
import { perPage } from '../../config'
import Spinner from '../Spinner/Spinner'
import { Center, ItemsList } from './Items.styles'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      category
      images
    }
  }
`

const Items = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY, {
    variables: { skip: page * perPage - perPage }
  })

  if (error)
    return <ErrorMessage error={new Error('Could not load the items')} margin />

  if (loading) return <Spinner margin />

  return (
    <Center>
      <ItemsList>
        {data.items.map((item) => {
          return <Item item={item} key={item.id}></Item>
        })}
      </ItemsList>

      <Pagination page={page}></Pagination>
    </Center>
  )
}

Items.propTypes = {
  page: PropTypes.number
}

export default Items
