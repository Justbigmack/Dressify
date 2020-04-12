import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './Spinner.styles'

const Spinner = ({ margin }) => {
  return (
    <SpinnerOverlay margin={margin}>
      <SpinnerContainer />
    </SpinnerOverlay>
  )
}

export default Spinner
