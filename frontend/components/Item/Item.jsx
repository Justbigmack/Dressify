import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import formatMoney from '../../utils/calcUtils'

import {
  ItemCard,
  ItemCardPrice,
  ItemCardInfo,
  ItemCardImage,
  ItemCardSummary,
  ItemCardTitle,
  ItemCardCategory
} from './Item.styles'

const Item = ({ item }) => (
  <Link
    href={{
      pathname: '/item',
      query: { id: item.id }
    }}
  >
    <ItemCard>
      <div>
        <ItemCardImage>
          {item.images[0] && <img src={item.images[0]} alt={item.title} />}
        </ItemCardImage>

        <ItemCardSummary>
          <ItemCardInfo>
            <ItemCardTitle>{item.title}</ItemCardTitle>
            <ItemCardCategory>{item.category}</ItemCardCategory>
          </ItemCardInfo>
          <ItemCardPrice>{formatMoney(item.price)}</ItemCardPrice>
        </ItemCardSummary>
      </div>
    </ItemCard>
  </Link>
)

Item.propTypes = {
  item: PropTypes.object.isRequired
}

export default Item
