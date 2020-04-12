import styled from 'styled-components'

const Form = styled.form`
  font-size: 1.5rem;
  width: 100%;
  line-height: 1.5;
  max-width: 50rem;
  text-align: center;

  margin-top: 10rem;

  @media only screen and (max-width: 1100px) {
    margin-top: 8rem;
  }

  @media only screen and (max-width: 700px) {
    margin-top: 6rem;
  }

  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);

  fieldset {
    border: none;
    width: 100%;
    margin: 0 auto;
  }

  label {
    display: block;
    margin: 2rem 0;
    text-align: left;
    font-weight: 500;

    &:first-child {
      margin-bottom: 1rem;
    }
  }

  input,
  select {
    border: 1px solid rgb(229, 229, 229);
    box-shadow: inset 0 1px 0 0 #ccc, inset -1px 0 0 0 #ccc,
      inset 0 -1px 0 0 #ccc, inset 1px 0 0 0 #ccc;
    width: 100%;
    border-radius: 2px;
    padding: 1rem 1rem;
    font-size: 1.5rem;
    font-weight: 400;
    transition: all 0.2s ease;

    &:focus {
      outline: 0;
      border-color: black;
    }
  }

  button,
  input[type='submit'] {
    font-family: 'Montserrat';
    color: ${(props) => props.theme.button};
    padding: 1rem 0;
    border: 2px solid ${(props) => props.theme.button};
    width: 30rem;
    text-transform: uppercase;
    background-color: white;
    border-radius: 2px;
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out;
    margin: 1rem 0;

    &:hover:enabled {
      cursor: pointer;
      color: white;
      background-color: ${(props) => props.theme.button};
    }

    &[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  #category {
    display: block;
    height: 4rem;
    background: white;
    cursor: pointer;
  }
`

export const FormLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1rem;

  a {
    font-size: 1.1rem;
    padding: 1rem;
    transition: all 0.3s ease;
    color: #0070c2;
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.orange};
    }
  }
`

export default Form
