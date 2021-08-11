import React from 'react'
import './style.css'

export default function ({
  className,
  expanded,
  children
}) {
  return (
    <div
      className={`container ${className}`}
      expanded={expanded}
    >
      {children}
    </div>
  )
}
