import styled from 'styled-components'

export const RemoteFromCartButtonStyles = styled.button`
  font-size: 3rem;
  color: ${props => props.theme.black};
  cursor: pointer;
  background: white;
  transition: all 0.2s ease-in-out;
  border: none;
  outline: none;

  &:hover {
    color: ${props => props.theme.orange};
  }
`
