import styled from 'styled-components'

export const Dropdown = styled.div`
  position: absolute;
  max-height: calc(100vh - 10rem);
  width: 100%;
  z-index: 1001;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  background: white;
  overflow: scroll;
`

export const DropdownItem = styled.div`
  cursor: pointer;
  padding: 1rem;
  transition: all 0.1s ease;
  width: 100%;
  max-width: 100%;
  background: white;
  display: flex;
  align-items: center;
  z-index: 10000;
  color: black;

  &:hover {
    background: #e6e6e6;
    cursor: pointer;
  }

  img {
    width: 40%;

    @media only screen and (max-width: 1650px) {
      width: 50%;
    }

    @media only screen and (max-width: 1350px) {
      width: 40%;
    }

    @media only screen and (max-width: 1150px) and (min-width: 1100px) {
      display: none;
    }

    @media only screen and (max-width: 1100px) {
      width: 30%;
    }

    @media only screen and (max-width: 500px) {
      width: 40%;
    }

    margin-right: 10px;
  }
`

export const DropdownItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  word-wrap: break-word;
  max-width: 100%;

  p {
    margin: 0.7rem;

    &:nth-child(2) {
      color: rgb(141, 141, 141);
    }

    &:nth-child(3) {
      color: rgb(250, 84, 0);
    }
  }
`

export const SearchStyles = styled.div`
  position: relative;
  width: 400px;

  @media only screen and (max-width: 1650px) {
    width: 300px;
  }

  @media only screen and (max-width: 1350px) {
    width: 220px;
  }

  @media only screen and (max-width: 1150px) {
    width: 210px;
  }

  @media only screen and (max-width: 1100px) {
    width: 100%;
  }
`

export const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
  height: 4rem;

  svg {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  #search {
    appearance: none;
    border: 1px solid rgb(229, 229, 229);
    box-shadow: inset 0 1px 0 0 #ccc, inset -1px 0 0 0 #ccc,
      inset 0 -1px 0 0 #ccc, inset 1px 0 0 0 #ccc;
    border-radius: 2px;
    width: 100%;
    padding: 1rem 2rem 1rem 4rem;
    font-size: 1.5rem;
    transition: all 0.2s ease;

    &:focus {
      outline: 0;
      border-color: black;
    }
  }
`
