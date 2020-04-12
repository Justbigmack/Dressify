import styled from 'styled-components'

export const CartCountStyles = styled.div`
  background: ${(props) => props.theme.orange};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;

  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;

  @media only screen and (max-width: 1100px) {
    height: 2rem;
    width: 2rem;
    min-width: unset;
    margin-left: unset;
    padding-top: 0;
    text-align: center;
    font-size: 1.2rem;
  }
`
export const CartCountAnimationStyles = styled.span`
  position: relative;

  @media only screen and (max-width: 1100px) {
    position: absolute;
    top: -1rem;
    right: 1rem;
  }

  @media only screen and (max-width: 700px) {
    top: -0.8rem;
  }

  .count {
    display: block;
    position: relative;
    transition: all 0.5s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`
