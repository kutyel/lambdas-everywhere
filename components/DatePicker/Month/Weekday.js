import React from 'react'

export default ({ children, className }) => (
  <span className={className}>{children.slice(0, 2)}</span>
)
