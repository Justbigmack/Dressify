import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { CURRENT_USER_QUERY } from '../User/User'
import Button from '../styles/Button.styles'
import Form, { FormLinks } from '../styles/Form.styles'

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

const SignIn = () => {
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  const [signIn, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await signIn()
        updateEmail('')
        updatePassword('')
        Router.push('/')
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign In</h2>

        <ErrorMessage error={error} />

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
          />
        </label>

        <Button type="submit">Sign In</Button>
      </fieldset>

      <FormLinks>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>

        <Link href="/restore">
          <a>Forgot Password</a>
        </Link>
      </FormLinks>
    </Form>
  )
}

export default SignIn
