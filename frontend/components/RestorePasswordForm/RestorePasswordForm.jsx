import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../styles/Button.styles'
import Form, { FormLinks } from '../styles/Form.styles'

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

const RestorePasswordForm = () => {
  const [email, setEmail] = useState('')

  const [
    reset,
    { error, loading, called }
  ] = useMutation(REQUEST_RESET_MUTATION, { variables: { email } })

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await reset()
        setEmail('')
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Restore Password</h2>

        <ErrorMessage error={error} />

        {!error && !loading && called && <p>Success! Check your email!</p>}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <Button type="submit">Restore Password</Button>
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

export default RestorePasswordForm
