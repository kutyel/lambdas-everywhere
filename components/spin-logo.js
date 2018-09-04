import styled from 'styled-components'

export default styled.img`
  animation: logo-spin infinite 20s linear;
  height: 300px;
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
