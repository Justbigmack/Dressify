import styled from 'styled-components'

export const CartStyles = styled.div`
  padding: 3rem;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40rem;
  transform: translateX(100%);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  display: grid;
  grid-template-rows: auto 1fr auto;

  ${(props) => props.open && `transform: translateX(0);`};

  @media only screen and (max-width: 700px) {
    width: 100%;
  }

  h3 {
    font-family: 'Montserrat';
    color: ${(props) => props.theme.black};
    display: inline-block;
    margin: 0;
    font-size: 3rem;
  }

  footer {
    border-top: 10px ${(props) => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;

    p {
      margin: 0;
      color: ${(props) => props.theme.orange};
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`

export const CloseButton = styled.button`
  background: white;
  color: black;
  font-size: 6rem;
  font-family: 'Montserrat';
  position: absolute;
  cursor: pointer;
  z-index: 2;
  right: 1.5rem;
  top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border: none;
  outline: none;

  @media only screen and (max-width: 700px) {
    width: 20%;
    right: 0;
  }

  &:hover {
    color: rgb(250, 84, 0);
  }
`
