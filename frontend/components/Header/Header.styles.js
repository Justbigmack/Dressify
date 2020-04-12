import styled from 'styled-components'

export const StyledHeader = styled.header`
  .header {
    display: flex;
    position: fixed;
    background: white;
    width: 100%;
    z-index: 100;
    height: 10rem;
    padding: 0 2rem;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.blackTr};
    justify-content: center;

    @media only screen and (max-width: 1100px) {
      justify-content: flex-end;
      height: 8rem;
    }

    @media only screen and (max-width: 700px) {
      justify-content: flex-end;
      height: 6rem;
    }

    .logo {
      height: 6rem;
      position: absolute;
      left: 2rem;
      top: 2rem;

      @media only screen and (max-width: 1100px) {
        height: 5rem;
        left: 2rem;
        top: 1.5rem;
      }

      @media only screen and (max-width: 700px) {
        height: 3.5rem;
        left: 2rem;
        top: 1rem;
      }
    }

    .searchContainer {
      position: absolute;
      right: 2rem;
      top: 3rem;
    }
  }
`
