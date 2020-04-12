import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import Button from '../styles/Button.styles'
import Form from '../styles/Form.styles'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      category
      price
    }
  }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $category: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      category: $category
      price: $price
    ) {
      id
      title
      description
      category
      price
    }
  }
`

const UpdateItem = ({ id }) => {
  const [title, updateTitle] = useState('')
  const [price, updatePrice] = useState('')
  const [description, updateDescription] = useState('')
  const [category, updateCategory] = useState('Shoes')

  const handleSubmit = async (e, updateItemMutation) => {
    e.preventDefault()
    const res = await updateItemMutation()

    Router.push({
      pathname: '/item',
      query: { id: res.data.updateItem.id }
    })
  }

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  })

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    variables: { id, title, description, category, price }
  })

  if (loading) return <Spinner margin />
  if (!data.item) return <p>No item found for id: ${id}</p>

  return (
    <Form onSubmit={(e) => handleSubmit(e, updateItem)}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          defaultValue={data.item.title}
          onChange={(e) => updateTitle(e.target.value)}
          required
        />
        <label htmlFor="price">Price in cents</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price in cents"
          defaultValue={data.item.price}
          onChange={(e) => updatePrice(parseFloat(e.target.value))}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          defaultValue={data.item.description}
          onChange={(e) => updateDescription(e.target.value)}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          defaultValue={data.item.category}
          onChange={(e) => updateCategory(e.target.value)}
          required
        >
          <option value="Shoes">Shoes</option>
          <option value="Shirts">Shirts</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Jackets">Jackets</option>
          <option value="Trousers">Trousers</option>
          <option value="Shorts">Shorts</option>
          <option value="Dresses">Dresses</option>
          <option value="Accessories">Accessories</option>
        </select>

        <Button type="submit">
          {loading ? 'Saving Changes' : 'Save Changes'}
        </Button>
      </fieldset>
    </Form>
  )
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default UpdateItem
