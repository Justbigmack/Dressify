import styled from 'styled-components'

export const Center = styled.div`
  text-align: center;
`

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 6rem;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  margin-top: 10rem;

  @media only screen and (max-width: 1100px) {
    margin-top: 8rem;
    grid-gap: 5rem;
    padding: 0 1rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 700px) {
    margin-top: 6rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
