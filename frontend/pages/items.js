import Items from '../components/Items/Items'

const ItemsPage = ({ query }) => (
  <div>
    <Items page={parseInt(query.page) || 1}></Items>
  </div>
)

export default ItemsPage
