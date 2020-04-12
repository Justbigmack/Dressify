import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { LS_MOBILE_MENU_OPEN_QUERY } from '../MobileNav/MobileNav'
import HamburgerStyles from './Hamburger.styles'

export const TOGGLE_MOBILE_MENU_MUTATION = gql`
  mutation {
    toggleMobileMenu @client
  }
`

const Hamburger = () => {
  const [toggleMobileMenu] = useMutation(TOGGLE_MOBILE_MENU_MUTATION)

  const {
    data: { mobileMenuOpen }
  } = useQuery(LS_MOBILE_MENU_OPEN_QUERY)

  return (
    <>
      <HamburgerStyles>
        <div className="menuToggle" onClick={() => toggleMobileMenu()}>
          <span className={mobileMenuOpen ? 'first' : null}></span>
          <span className={mobileMenuOpen ? 'second' : null}></span>
          <span className={mobileMenuOpen ? 'third' : null}></span>
        </div>
      </HamburgerStyles>
    </>
  )
}

export default Hamburger
