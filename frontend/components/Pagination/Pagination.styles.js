import styled from 'styled-components'

export const PaginationStyles = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 4rem 0 0 0;

  & > * {
    padding: 0 1rem;
  }

  a {
    fill: ${(props) => props.theme.black};
    transition: all 0.2s ease;

    & > * {
      width: 3rem;
      height: 3rem;
    }

    &:hover {
      cursor: pointer;
      fill: ${(props) => props.theme.orange};
      color: ${(props) => props.theme.orange};
    }
  }

  a[aria-disabled='true'] {
    color: grey;
    fill: ${(props) => props.theme.grey};
    pointer-events: none;
  }
`

export const CurrentPage = styled.div`
  background: ${(props) => props.theme.black};
  border-radius: 2px;
  color: white;
  font-weight: 500;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
`
