import React from 'react'
import PropTypes from 'prop-types'

import ErrorStyles from './ErrorMessage.styles'

const DisplayError = ({ error, margin }) => {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i} margin={margin}>
        <p data-test="graphql-error">
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles margin={margin}>
      <p data-test="graphql-error">
        <strong>Error occured: </strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  )
}

DisplayError.defaultProps = {
  error: {}
}

DisplayError.propTypes = {
  error: PropTypes.object
}

export default DisplayError
