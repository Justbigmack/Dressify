import styled from 'styled-components'

const Button = styled.button`
  font-family: 'Montserrat';
  color: ${(props) => props.theme.black};
  margin: 1rem 0;
  padding: 1.5rem 0;
  width: 100%;
  text-transform: uppercase;
  border: 2px solid ${(props) => props.theme.button};
  border-radius: 2px;
  background-color: white;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;

  &:hover:enabled {
    cursor: pointer;
    color: white;
    background-color: ${(props) => props.theme.button};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default Button
