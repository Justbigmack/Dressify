import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { possiblePermissions } from '../../utils/possiblePermissions'
import Button from '../styles/Button.styles'

export const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

const PermissionsTableUser = ({ user: { id, name, email, permissions } }) => {
  const [userPermissions, setUserPermissions] = useState(permissions)

  const handlePermissionChange = (e) => {
    const checkbox = e.target
    let updatedPermissions = [...userPermissions]

    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value)
    } else {
      updatedPermissions = updatedPermissions.filter(
        (permission) => permission !== checkbox.value
      )
    }

    setUserPermissions(updatedPermissions)
  }

  const [updatePermissions, { loading, error }] = useMutation(
    UPDATE_PERMISSIONS_MUTATION
  )

  return (
    <>
      {error ? (
        <tr>
          <td colSpan="10">
            <ErrorMessage error={error} />
          </td>
        </tr>
      ) : null}
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {possiblePermissions.map((permission) => (
          <td key={permission}>
            <label htmlFor={`${id}-permission-${permission}`}>
              <input
                type="checkbox"
                checked={userPermissions.includes(permission)}
                name={permission}
                value={permission}
                onChange={handlePermissionChange}
                id={`${id}-permission-${permission}`}
              />
            </label>
          </td>
        ))}
        <td>
          <Button
            type="button"
            disabled={loading}
            onClick={() =>
              console.log(id) ||
              updatePermissions({
                variables: { permissions: userPermissions, userId: id }
              })
            }
          >
            {loading ? 'Updating' : 'Update'}
          </Button>
        </td>
      </tr>
    </>
  )
}

PermissionsTableUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array
  }).isRequired
}

export default PermissionsTableUser
