import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import Spinner from '../Spinner/Spinner'

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      orders {
        id
      }
      cart {
        id
        quantity
        item {
          id
          price
          images
          title
          description
          category
        }
      }
    }
  }
`

const User = ({ children }) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)
  if (loading || error) return <Spinner />
  return children(data)
}

User.propTypes = {
  children: PropTypes.func.isRequired
}

export default User
