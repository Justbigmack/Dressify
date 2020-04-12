import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import PermissionsTableUser from '../PermissionsTableUser/PermissionsTableUser'
import { possiblePermissions } from '../../utils/possiblePermissions'
import Spinner from '../Spinner/Spinner'

import { PermissionsStyles, PermissionsTable } from './Permissions.styles'

export const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = () => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY)

  if (loading) return <Spinner margin />
  if (error)
    return <ErrorMessage error={new Error('Could not load user permissions')} />

  return (
    <PermissionsStyles>
      <h2>Manage Permissions</h2>
      <PermissionsTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {possiblePermissions.map((permission) => (
              <th key={permission}>{permission}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <PermissionsTableUser user={user} key={user.id} />
          ))}
        </tbody>
      </PermissionsTable>
    </PermissionsStyles>
  )
}

export default Permissions
