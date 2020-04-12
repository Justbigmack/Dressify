import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { perPage } from '../../config'
import NextIcon from '../../public/icons/next.svg'
import PreviousIcon from '../../public/icons/back.svg'
import { CurrentPage, PaginationStyles } from './Pagination.styles'

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`

const Pagination = ({ page }) => {
  const { loading, error, data } = useQuery(PAGINATION_QUERY)

  if (error)
    return <ErrorMessage error={new Error('Error loading pagination')} />
  if (loading) return null

  const count = data.itemsConnection.aggregate.count
  const pages = Math.ceil(count / perPage)

  return (
    <PaginationStyles>
      <Head>
        <title>
          Dressify | Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: 'items',
          query: { page: page - 1 }
        }}
      >
        <a data-test="prev" aria-disabled={page <= 1}>
          <PreviousIcon />
        </a>
      </Link>
      {page - 2 > 0 && (
        <Link
          href={{
            pathname: 'items',
            query: { page: page - 2 }
          }}
        >
          <a>{page - 2}</a>
        </Link>
      )}
      {page - 1 > 0 && (
        <Link
          href={{
            pathname: 'items',
            query: { page: page - 1 }
          }}
        >
          <a>{page - 1}</a>
        </Link>
      )}

      <CurrentPage>{page}</CurrentPage>
      {page + 1 <= pages && (
        <Link
          href={{
            pathname: 'items',
            query: { page: page + 1 }
          }}
        >
          <a>{page + 1}</a>
        </Link>
      )}
      {page + 2 <= pages && (
        <Link
          href={{
            pathname: 'items',
            query: { page: page + 2 }
          }}
        >
          <a>{page + 2}</a>
        </Link>
      )}
      <Link
        href={{
          pathname: 'items',
          query: { page: page + 1 }
        }}
      >
        <a data-test="next" aria-disabled={pages <= page}>
          <NextIcon />
        </a>
      </Link>
    </PaginationStyles>
  )
}

Pagination.propTypes = {
  page: PropTypes.number
}

export default Pagination
