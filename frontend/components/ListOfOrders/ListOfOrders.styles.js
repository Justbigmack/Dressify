import styled from 'styled-components'

export const OrderUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;

  margin-top: 10rem;

  h2 {
    font-weight: 500;
  }

  h3 {
    font-weight: 400;
  }

  @media only screen and (max-width: 1100px) {
    margin-top: 8rem;
  }

  @media only screen and (max-width: 700px) {
    margin-top: 6rem;
  }

  p {
    margin: 0;
  }
`

export const OrderItemStyles = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    border-bottom: 2px solid rgb(250, 84, 0);
  }
`

export const ListOfOrdersStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin: 2rem 0;
`

export const OrderInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }
`

export const OrderLeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 3rem;

  @media only screen and (max-width: 650px) {
    margin-right: 1rem;
  }
`

export const OrderRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const OrderLeftTextContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;

  margin-right: 3rem;

  @media only screen and (max-width: 650px) {
    margin-right: 1rem;
  }
`

export const OrderRightTextContainer = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  margin-left: 3rem;

  @media only screen and (max-width: 650px) {
    margin-left: 1rem;
  }
`

export const OrderLightGreyText = styled.p`
  color: rgb(141, 141, 141);
  font-size: 14px;

  @media only screen and (max-width: 650px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 11px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 10px;
  }
`

export const OrderUsualText = styled.p`
  color: rgb(17, 17, 17);
  font-size: 16px;

  @media only screen and (max-width: 650px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`

export const OrderBoldText = styled.p`
  color: rgb(17, 17, 17);
  font-weight: 500;
  font-size: 16px;

  @media only screen and (max-width: 650px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`

export const OrderSuccessText = styled.p`
  color: green;
  font-weight: 500;
  font-size: 16px;

  @media only screen and (max-width: 650px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }

  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`

export const OrderProductNames = styled.div`
  display: flex;
  flex-direction: column;
`
