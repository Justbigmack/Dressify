import CheckIfSignedIn from '../components/CheckIfSignedIn/CheckIfSignedIn'
import Order from '../components/Order/Order'

const OrderPage = ({ query }) => (
  <CheckIfSignedIn>
    <Order id={query.id} />
  </CheckIfSignedIn>
)

export default OrderPage
