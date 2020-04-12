import styled, { keyframes } from 'styled-components'

export const SpinnerOverlay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.margin && `margin-top: 10rem`};

  @media only screen and (max-width: 1100px) {
    ${props => props.margin && `margin-top: 8rem`};
  }

  @media only screen and (max-width: 700px) {
    ${props => props.margin && `margin-top: 6rem`};
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border: 3px solid ${props => props.theme.orange};
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s linear infinite;
`
