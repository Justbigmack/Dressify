import styled from 'styled-components'

export const CartItemStyles = styled.li`
  display: flex;
  margin: 1rem 0;
  background: white;
  width: 100%;

  .cart-item-summary {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 56%;
    padding-left: 10px;

    @media only screen and (max-width: 700px) {
      width: 50%;
    }

    .cart-item-title {
      margin: 0;
      color: ${(props) => props.theme.black};
      font-size: 15px;
    }

    .cart-item-category {
      margin: 0;
      color: ${(props) => props.theme.grey};
      font-size: 15px;
    }

    .cart-item-price {
      margin: 0;
      color: ${(props) => props.theme.black};
      font-size: 15px;
    }
  }

  .cart-item-remove {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 33%;
    height: 130px;
    object-fit: contain;
  }
`
