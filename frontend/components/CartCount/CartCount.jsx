import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import { CartCountAnimationStyles, CartCountStyles } from './CartCount.styles'

const CartCount = ({ count }) => (
  <CartCountAnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 500, exit: 500 }}
      >
        <CartCountStyles>{count}</CartCountStyles>
      </CSSTransition>
    </TransitionGroup>
  </CartCountAnimationStyles>
)

CartCount.propTypes = {
  count: PropTypes.number
}

export default CartCount
