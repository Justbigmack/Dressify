import styled from 'styled-components'

export const NavStyles = styled.ul`
  display: flex;

  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    color: ${(props) => props.theme.black};
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 500;
    background: none;
    border: 0;
    cursor: pointer;
    font-family: Montserrat;

    &:after {
      height: 2px;
      background: rgb(250, 84, 0);
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: all 0.1s ease-out;
      left: 50%;
      bottom: 0;
      margin-top: 2rem;
    }

    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }

      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
`

export const MobileNavStyles = styled.div`
  display: flex;
  align-items: center;

  .icon {
    width: 3rem;
    height: 3rem;
    fill: black;
    margin: 0 1rem;
    padding: 0.2rem;

    &:last-of-type {
      margin: 0 2rem 0 1rem;
    }
  }
`

export const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
