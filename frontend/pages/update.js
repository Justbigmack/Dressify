import UpdateItemForm from '../components/UpdateItemForm/UpdateItemForm'

const Update = ({ query }) => {
  return <UpdateItemForm id={query.id} />
}

export default Update
