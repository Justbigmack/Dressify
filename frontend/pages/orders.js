import CheckIfSignedIn from '../components/CheckIfSignedIn/CheckIfSignedIn'
import ListOfOrders from '../components/ListOfOrders/ListOfOrders'

const OrdersPage = () => (
  <CheckIfSignedIn>
    <ListOfOrders />
  </CheckIfSignedIn>
)

export default OrdersPage
