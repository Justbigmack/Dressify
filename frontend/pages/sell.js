import CheckIfSignedIn from '../components/CheckIfSignedIn/CheckIfSignedIn'
import CreateItemForm from '../components/CreateItemForm/CreateItemForm'

const Sell = () => {
  return (
    <CheckIfSignedIn>
      <CreateItemForm />
    </CheckIfSignedIn>
  )
}

export default Sell
