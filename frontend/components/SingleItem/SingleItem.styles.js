import styled from 'styled-components'

export const SingleItemStyles = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  width: 100%;

  margin-top: 10rem;

  @media only screen and (max-width: 1100px) {
    margin-top: 8rem;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    margin-top: 6rem;
  }
`

export const SingleItemImageGallery = styled.div`
  width: 66.66%;
  display: grid;
  grid-template-columns: 49% 49%;
  grid-gap: 15px;
  padding-right: 2rem;

  img {
    max-width: 100%;
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    padding: 0 1rem;
  }
`

export const SingleItemSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.33%;
  overflow: hidden;
  word-wrap: break-word;
  padding-left: 1rem;

  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`

export const SingleItemInfo = styled.div`
  @media only screen and (max-width: 700px) {
    width: 100%;
    order: 100;
  }

  h2 {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }

  h3 {
    margin: 0;
    font-weight: 400;
  }
`

export const SingleItemButtons = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 700px) {
    width: 100%;
    order: 10;
  }

  h2 {
    font-weight: 400;
    font-family: 'Montserrat';
  }
`
