import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import NProgress from 'nprogress'

import { ALL_ITEMS_QUERY } from '../Items/Items'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../styles/Button.styles'
import { CreateItemForm, FormImageGallery } from './CreateItemForm.styles'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $category: String!
    $price: Int!
    $images: [String]
  ) {
    createItem(
      title: $title
      description: $description
      category: $category
      price: $price
      images: $images
    ) {
      id
    }
  }
`

const CreateItem = () => {
  const [title, updateTitle] = useState('')
  const [price, updatePrice] = useState('')
  const [description, updateDescription] = useState('')
  const [category, updateCategory] = useState('Shoes')
  const [images, updateImages] = useState([])
  const [uploading, toggleUploadingStatus] = useState(false)

  const handleFileChange = async (e) => {
    NProgress.start()
    toggleUploadingStatus(true)

    const files = e.target.files

    for (let item in files) {
      if (typeof files[item] === 'object') await uploadFile(files[item])
    }

    toggleUploadingStatus(false)
    NProgress.done()
  }

  const uploadFile = async (file) => {
    const data = new FormData()

    data.append('file', file)
    data.append('upload_preset', 'andrewk-shop')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/justbigmack/image/upload',
      {
        method: 'POST',
        body: data
      }
    )

    const uploadedFile = await res.json()

    updateImages((oldImages) => [...oldImages, uploadedFile.secure_url])
  }

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    variables: { title, description, category, price, images },
    refetchQueries: [{ query: ALL_ITEMS_QUERY }]
  })

  return (
    <CreateItemForm
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await createItem()
        Router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id }
        })
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">Images</label>
        <input
          type="file"
          name="file"
          id="file"
          placeholder="Upload an Image"
          onChange={handleFileChange}
          required
          multiple
        />

        {images.length > 0 && (
          <FormImageGallery>
            {images.map((image, index) => (
              <img key={index} src={image} alt="Upload Preview" />
            ))}
          </FormImageGallery>
        )}

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          required
        />
        <label htmlFor="price">Price in cents</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price in cents"
          value={price}
          onChange={(e) => updatePrice(parseFloat(e.target.value))}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => updateDescription(e.target.value)}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={category}
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

        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </Button>
      </fieldset>
    </CreateItemForm>
  )
}

export default CreateItem
