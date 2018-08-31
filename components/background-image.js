import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`

const Img = styled.img`
  position: absolute;
  height: 100vh;
  z-index: -1;
  transform: translateY(-50%) translateX(-50%);
`

export default props => (
  <Wrapper>
    <Img {...props} />
  </Wrapper>
)
