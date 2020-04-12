import ResetPasswordForm from '../components/ResetPasswordForm/ResetPasswordForm'

const ResetPassword = ({ query }) => {
  return <ResetPasswordForm resetToken={query.resetToken} />
}

export default ResetPassword
