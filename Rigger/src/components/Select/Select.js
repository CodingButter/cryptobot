import React, { useState } from 'react'

export default function ({
  options,
  defaultOption,
  selected
}) {
  const insertOptions = () => {
    if (options && options.length > 0) {
      return options.map((option, index) => {
        return (
          <option
            key={index}
            className="option"
            value={option.value}
            title={option.value}
          >
            {option.label}
          </option>
        )
      })
    }
    return []
  }

  return (
    <div className="select-wrap">
      <select className="option selected">
        {insertOptions()}
      </select>
    </div>
  )
}
