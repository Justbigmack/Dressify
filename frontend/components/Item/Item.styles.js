import styled from 'styled-components'

export const ItemCard = styled.div`
  background: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  display: flex;
  border-radius: 2px;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: white;

  &:hover {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
`

export const ItemCardImage = styled.div`
  img {
    max-width: 100%;
    min-height: 350px;
    object-fit: contain;
  }
`

export const ItemCardSummary = styled.div`
  display: flex;
  margin: 0 1.5rem 1rem 1.5rem;
  overflow: hidden;
`

export const ItemCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  text-align: left;
`

export const ItemCardTitle = styled.div`
  color: rgb(17, 17, 17);
  font-size: 16px;
`
export const ItemCardCategory = styled.div`
  color: rgb(141, 141, 141);
  font-size: 16px;
`

export const ItemCardPrice = styled.div`
  width: 25%;
  text-align: right;
  color: ${(props) => props.theme.orange};
`
