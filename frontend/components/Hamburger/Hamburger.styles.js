import styled from 'styled-components'

const HamburgerStyles = styled.div`
  background-color: inherit;
  display: flex;
  align-items: center;
  z-index: 9999;

  .menuToggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;

    span {
      display: block;
      width: 2.7rem;
      height: 2px;
      margin-bottom: 0.5rem;
      position: relative;
      background: black;
      border-radius: 3px;
      z-index: 1000;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

      &:last-of-type {
        margin-bottom: 0;
      }

      &.first {
        opacity: 1;
        transform: rotate(45deg) translate(1px, 0px);
        background: #232323;
      }

      &.second {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }

      &.third {
        transform: rotate(-45deg) translate(-1px, -1px);
        background: #232323;
      }
    }
  }
`
export default HamburgerStyles
