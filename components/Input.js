import styled from 'styled-components'

export default styled.input`
  font: inherit;
  padding: 5px;
  width: 90px;
  border: 1px solid;
  border-radius: 2px;
  border-color: ${({ active }) => (active ? 'rebeccapurple' : '#ccc')};
  &:focus {
    outline: none;
  }
`
