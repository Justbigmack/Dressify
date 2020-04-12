import { useQuery } from '@apollo/react-hooks'

import { CURRENT_USER_QUERY } from '../User/User'
import SignInForm from '../SignInForm/SignInForm'
import Spinner from '../Spinner/Spinner'

const PleaseSignIn = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY)

  if (loading) return <Spinner margin />
  if (!data || !data.me) return <SignInForm>{children}</SignInForm>

  return children
}

export default PleaseSignIn
