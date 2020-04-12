import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { CURRENT_USER_QUERY } from '../User/User'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../styles/Button.styles'
import Form, { FormLinks } from '../styles/Form.styles'

export const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`

const ResetPasswordForm = ({ resetToken }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  if (!resetToken)
    return (
      <ErrorMessage
        error={new Error('You need a reset token to reset password')}
      />
    )

  const [reset, { error, loading, called }] = useMutation(RESET_MUTATION, {
    variables: { resetToken, password, confirmPassword },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await reset()
        setPassword('')
        setConfirmPassword('')
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Password</h2>

        {error && <ErrorMessage error={error} />}

        {!error && !loading && called && <p>Success! You are now logged in!</p>}

        <label htmlFor="password">
          New Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm New Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <Button type="submit" disabled={loading}>
          Reset Password
        </Button>
      </fieldset>
      <FormLinks>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>

        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </FormLinks>
    </Form>
  )
}

ResetPasswordForm.propTypes = {
  resetToken: PropTypes.string.isRequired
}

export default ResetPasswordForm
