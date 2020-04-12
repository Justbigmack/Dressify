import styled from 'styled-components'

const MobileSearchStyles = styled.div`
  padding: 1rem 1rem;
  background: white;
  position: fixed;
  height: 8rem;
  top: 0;
  right: 0;
  width: 100%;
  transform: translateY(-100%);
  transition: all 0.3s ease;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  display: flex;
  align-items: center;

  ${props => props.open && `transform: translateY(0);`};

  @media only screen and (max-width: 700px) {
    height: 6rem;
  }
`

export default MobileSearchStyles
