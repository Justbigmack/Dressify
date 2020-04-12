import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import Search from '../Search/Search'
import MobileSearchStyles from './MobileSearch.styles'

export const LS_MOBILE_SEARCH_OPEN_QUERY = gql`
  query {
    mobileSearchOpen @client
  }
`

const MobileSearch = ({ onBlurFunc }) => {
  const {
    data: { mobileSearchOpen }
  } = useQuery(LS_MOBILE_SEARCH_OPEN_QUERY)

  return (
    <MobileSearchStyles open={mobileSearchOpen}>
      <Search onBlurFunc={onBlurFunc} />
    </MobileSearchStyles>
  )
}

MobileSearch.propTypes = {
  onBlurFunc: PropTypes.func
}

export default MobileSearch
