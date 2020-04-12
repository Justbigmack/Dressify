import React from 'react'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import { TOGGLE_CART_MUTATION } from '../Cart/Cart'
import { calcItems } from '../../utils/calcUtils'
import CartCount from '../CartCount/CartCount'
import CartIcon from '../../public/icons/shopping-cart.svg'
import Hamburger from '../Hamburger/Hamburger'
import MobileSearch from '../MobileSearch/MobileSearch'
import MobileNav from '../MobileNav/MobileNav'
import SearchIcon from '../../public/icons/search.svg'
import SignOutButton from '../SignOutButton/SignOutButton'
import User from '../User/User'
import { MobileNavStyles, NavStyles, CartContainer } from './Nav.styles'

export const TOGGLE_MOBILE_SEARCH_MUTATION = gql`
  mutation {
    toggleMobileSearch @client
  }
`

const Nav = ({ isTablet }) => {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION)
  const [toggleMobileSearch] = useMutation(TOGGLE_MOBILE_SEARCH_MUTATION)

  return (
    <User>
      {({ me }) => {
        return (
          <>
            {!isTablet && (
              <NavStyles data-test="nav">
                <Link href="/items">
                  <a>Shop</a>
                </Link>
                {me && (
                  <>
                    <Link href="/sell">
                      <a>Sell</a>
                    </Link>
                    <Link href="/orders">
                      <a>Orders</a>
                    </Link>
                    <SignOutButton />
                    <button onClick={toggleCart}>
                      My Cart
                      <CartCount count={calcItems(me.cart)}></CartCount>
                    </button>
                  </>
                )}
                {!me && (
                  <Link href="/signin">
                    <a>Sign In</a>
                  </Link>
                )}
              </NavStyles>
            )}

            {isTablet && (
              <div>
                <MobileNavStyles>
                  <SearchIcon className="icon" onClick={toggleMobileSearch} />
                  {me && (
                    <CartContainer>
                      <CartIcon className="icon" onClick={toggleCart} />
                      <CartCount count={calcItems(me.cart)}></CartCount>
                    </CartContainer>
                  )}
                  <Hamburger />
                </MobileNavStyles>
                <MobileSearch onBlurFunc={toggleMobileSearch} />
                <MobileNav me={me} />
              </div>
            )}
          </>
        )
      }}
    </User>
  )
}

Nav.propTypes = {
  isTablet: PropTypes.bool.isRequired
}

export default Nav
