import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import AddToCartButton from '../AddToCartButton/AddToCartButton'
import DeleteButton from '../DeleteButton/DeleteButton'
import Spinner from '../Spinner/Spinner'
import Button from '../styles/Button.styles'

import {
  SingleItemStyles,
  SingleItemImageGallery,
  SingleItemInfo,
  SingleItemSummary,
  SingleItemButtons
} from './SingleItem.styles'
import formatMoney from '../../utils/calcUtils'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      images
      category
    }
    me {
      id
      permissions
    }
  }
`

const checkPermissions = (user) => {
  if (!user) return false
  return user.permissions.some((permission) =>
    ['ADMIN', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'].includes(
      permission
    )
  )
}

const SingleItem = ({ id }) => {
  const { error, loading, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  })

  if (error) return <ErrorMessage error={error} />
  if (loading) return <Spinner margin />
  if (!data || !data.item)
    return <ErrorMessage error={new Error('No Item Found')} />

  const item = data.item
  const allowed = checkPermissions(data.me)

  return (
    <SingleItemStyles>
      <Head>
        <title>Dressify | {item.title}</title>
      </Head>
      <SingleItemImageGallery>
        {item.images.map((image, index) => (
          <img src={image} alt={'Item Preview'} key={index} />
        ))}
      </SingleItemImageGallery>
      <SingleItemSummary>
        <SingleItemInfo>
          <h3>{item.category}</h3>
          <h2>{item.title}</h2>
          <h2>{formatMoney(item.price)}</h2>
          <p>{item.description}</p>
        </SingleItemInfo>

        <SingleItemButtons>
          {data.me ? (
            <AddToCartButton id={item.id} />
          ) : (
            <h2>Sign in to purchase items.</h2>
          )}
          {allowed && (
            <>
              <Link
                href={{
                  pathname: 'update',
                  query: { id: item.id }
                }}
              >
                <Button>Edit Item</Button>
              </Link>
              <DeleteButton id={item.id}>Delete Item</DeleteButton>
            </>
          )}
        </SingleItemButtons>
      </SingleItemSummary>
    </SingleItemStyles>
  )
}

SingleItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default SingleItem
