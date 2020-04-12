import styled from 'styled-components'

const MobileNavStyles = styled.div`
  padding: 1rem 1rem;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 100%;
  transform: translateX(100%);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a,
  button {
    padding: 3rem 3rem;
    display: flex;

    position: relative;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 400;
    background: none;
    border: 0;
    cursor: pointer;
    font-family: Montserrat;
  }

  ${props => props.open && `transform: translateX(0);`};
`

export default MobileNavStyles
