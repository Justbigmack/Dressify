import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'

import { CURRENT_USER_QUERY } from '../User/User'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../styles/Button.styles'
import Form, { FormLinks } from '../styles/Form.styles'

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signUp(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

const SignUp = () => {
  const [name, updateName] = useState('')
  const [email, updateEmail] = useState('')
  const [password, updatePassword] = useState('')

  const [signUp, { error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: { email, name, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return (
    <Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault()
        await signUp()
        updateName('')
        updateEmail('')
        updatePassword('')
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up</h2>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => updateName(e.target.value)}
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
        <Button type="submit">Sign Up</Button>
      </fieldset>
      <FormLinks>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>

        <Link href="/restore">
          <a>Forgot Password</a>
        </Link>
      </FormLinks>
    </Form>
  )
}

export default SignUp
