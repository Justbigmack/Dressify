import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import throttle from 'lodash.throttle'

import Cart from '../Cart/Cart'
import Nav from '../Nav/Nav'
import Search from '../Search/Search'
import { StyledHeader } from './Header.styles'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Header = () => {
  const [isTablet, updateIsTablet] = useState(false)

  useEffect(() => {
    updateIsTablet(window.innerWidth <= 1100)
    window.addEventListener('resize', onWindowResize)

    return () => {
      document.removeEventListener('resize', onWindowResize)
      onWindowResize.cancel()
    }
  }, [])

  const onWindowResize = throttle(() => {
    updateIsTablet(window.innerWidth <= 1100)
  }, 300)

  return (
    <StyledHeader>
      <div className="header">
        <Link href="/">
          <a>
            <img className="logo" src="/logo.png" alt="Shop Logo" />
          </a>
        </Link>
        <Nav isTablet={isTablet} />
        {!isTablet && (
          <>
            <div className="searchContainer">
              <Search />
            </div>
          </>
        )}
      </div>
      <Cart />
    </StyledHeader>
  )
}

export default Header
