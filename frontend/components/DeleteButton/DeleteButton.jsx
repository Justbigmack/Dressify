import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import PropTypes from 'prop-types'

import { ALL_ITEMS_QUERY } from '../Items/Items'
import Button from '../styles/Button.styles'

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const DeleteButton = ({ id, children }) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: ALL_ITEMS_QUERY }]
  })

  return (
    <Button
      onClick={async () => {
        if (confirm('Are you sure you want to delete this item?')) {
          await deleteItem()
          Router.push({
            pathname: '/'
          })
        }
      }}
    >
      {children}
    </Button>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default DeleteButton
