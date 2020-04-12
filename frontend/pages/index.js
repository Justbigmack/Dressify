import Items from '../components/Items/Items'

const Home = ({ query }) => {
  return <Items page={parseInt(query.page) || 1}></Items>
}

export default Home
