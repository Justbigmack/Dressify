import styled from 'styled-components'

export default styled.div`
  padding: 1.2rem;
  width: 100%;
  background: #f44336;
  margin: 2rem 0;
  color: white;
  border-radius: 3px;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.05);

  ${(props) => props.margin && `margin-top: 10rem`};

  @media only screen and (max-width: 1100px) {
    ${(props) => props.margin && `margin-top: 8rem`};
  }

  @media only screen and (max-width: 700px) {
    ${(props) => props.margin && `margin-top: 6rem`};
  }

  p {
    margin: 0;
    font-weight: 100;
  }

  strong {
    margin-right: 1rem;
  }
`
