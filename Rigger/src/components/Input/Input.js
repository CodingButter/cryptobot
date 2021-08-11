import { useState } from 'react'
import './style.css'

const Input = function ({
  onChange,
  value,
  label,
  placeHolder,
  id,
  type
}) {
  const [elev, setElev] = useState(0)

  const addLabel = (inputLabel) => {
    if (inputLabel) {
      return (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      )
    }
  }

  return (
    <div
      className="input-wrapper elevated"
      style={{ '--elev': elev }}
    >
      {addLabel(label)}
      <input
        value={value}
        onChange={onChange}
        id={id}
        onFocus={() => setElev(8)}
        onBlur={() => setElev(0)}
        placeholder={placeHolder ? placeHolder : ''}
        type={type || 'text'}
        className={`input-field`}
      />
    </div>
  )
}

export default Input
