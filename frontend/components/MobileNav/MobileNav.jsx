import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import PropTypes from 'prop-types'

import SignOutButton from '../SignOutButton/SignOutButton'
import { TOGGLE_MOBILE_MENU_MUTATION } from '../Hamburger/Hamburger'
import MobileNavStyles from './MobileNav.styles'

export const LS_MOBILE_MENU_OPEN_QUERY = gql`
  query {
    mobileMenuOpen @client
  }
`

const MobileNav = ({ me }) => {
  const {
    data: { mobileMenuOpen }
  } = useQuery(LS_MOBILE_MENU_OPEN_QUERY)

  const [toggleMobileMenu] = useMutation(TOGGLE_MOBILE_MENU_MUTATION)

  return (
    <MobileNavStyles open={mobileMenuOpen}>
      <Link href="/items">
        <a onClick={toggleMobileMenu}>Shop</a>
      </Link>
      {me && (
        <>
          <Link href="/sell">
            <a onClick={toggleMobileMenu}>Sell</a>
          </Link>
          <Link href="/orders">
            <a onClick={toggleMobileMenu}>Orders</a>
          </Link>
          <SignOutButton />
        </>
      )}
      {!me && (
        <Link href="/signin">
          <a onClick={toggleMobileMenu}>Sign In</a>
        </Link>
      )}
    </MobileNavStyles>
  )
}

MobileNav.propTypes = {
  me: PropTypes.object
}

export default MobileNav
