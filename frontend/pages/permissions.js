import CheckIfSignedIn from '../components/CheckIfSignedIn/CheckIfSignedIn'
import Permissions from '../components/Permissions/Permissions'

const PermissionsPage = () => {
  return (
    <CheckIfSignedIn>
      <Permissions />
    </CheckIfSignedIn>
  )
}

export default PermissionsPage
