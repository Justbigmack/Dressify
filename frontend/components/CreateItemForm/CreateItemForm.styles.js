import styled from 'styled-components'

export const CreateItemForm = styled.form`
  font-size: 1.5rem;
  width: 100%;
  line-height: 1.5;
  max-width: 65rem;
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
    margin: 1rem 0;
    text-align: left;
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
    margin: 2rem auto;

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

  input[type='file']::-webkit-file-upload-button {
    visibility: hidden;
  }

  input[type='file']::before {
    content: 'Upload Images...';
    display: inline-block;
    color: white;
    background: ${(props) => props.theme.button};
    padding: 1rem 6rem;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
  }
`

export const FormImageGallery = styled.div`
  border: 1px solid rgb(229, 229, 229);
  box-shadow: inset 0 1px 0 0 #ccc, inset -1px 0 0 0 #ccc, inset 0 -1px 0 0 #ccc,
    inset 1px 0 0 0 #ccc;
  width: 100%;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 1rem;
  padding: 20px;

  img {
    max-width: 100%;
  }
`
