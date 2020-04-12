import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import Header from '../Header/Header'
import Meta from '../Meta/Meta'
import { Inner, PageStyles } from './Page.styles'
import theme from '../Theme/Theme.styles'

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  src: local('Montserrat Light'), local('Montserrat-Light'),
       url('/fonts/montserrat-v14-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/montserrat-v14-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'),
        url('/fonts/montserrat-v14-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/montserrat-v14-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

  
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    src: local('Montserrat Medium'), local('Montserrat-Medium'),
        url('/fonts/montserrat-v14-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/montserrat-v14-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Montserrat';
  }

  a {
    text-decoration: none;
    color: black;
  }
`

const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <PageStyles>
      <Meta />
      <Header />
      <Inner>{children}</Inner>
      <GlobalStyle />
    </PageStyles>
  </ThemeProvider>
)

export default Page
