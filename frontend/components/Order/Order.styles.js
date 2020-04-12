import styled from 'styled-components'

const OrderStyles = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  margin-top: 10rem;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;

  @media only screen and (max-width: 1100px) {
    margin-top: 8rem;
  }

  @media only screen and (max-width: 800px) {
    font-size: 13px;
  }

  @media only screen and (max-width: 700px) {
    margin-top: 6rem;
  }

  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.grey};

    @media only screen and (max-width: 800px) {
      grid-template-columns: 2fr 4fr;
    }

    span {
      padding: 1rem;
    }
  }
  .order-item {
    border-bottom: 1px solid ${props => props.theme.grey};
    display: grid;
    grid-template-columns: 2fr 4fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;

    &:last-child {
      padding-bottom: 0;
      border-bottom: unset;
    }

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`
export default OrderStyles
