import styled from 'styled-components'

export const PermissionsStyles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: scroll;

  margin-top: 10rem;

  @media only screen and (max-width: 1100px) {
    margin-top: 8rem;
  }

  @media only screen and (max-width: 700px) {
    margin-top: 6rem;
  }
`

export const PermissionsTable = styled.table`
  border-spacing: 0;
  border: 1px solid ${props => props.theme.offWhite};

  thead {
    font-size: 11px;
  }

  td,
  th {
    border: 1px solid black;
    border-left: none;
    padding: 10px;
    position: relative;
    text-align: center;

    &:last-child {
      border: none;
      width: 150px;

      button {
        width: 100%;
      }
    }

    label {
      display: block;
      cursor: pointer;

      input {
        cursor: pointer;
      }
    }
  }

  th {
    &:first-child {
      border-left: 1px solid black;
    }

    &:last-child {
      border: 1px solid black;
      border-left: none;
    }
  }

  td {
    &:first-child {
      border: 1px solid black;
      border-top: none;
    }

    border-top: none;
  }

  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`
