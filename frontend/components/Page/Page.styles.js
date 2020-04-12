import styled from 'styled-components'

export const PageStyles = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  background: white;
  display: flex;
  justify-content: center;
`
