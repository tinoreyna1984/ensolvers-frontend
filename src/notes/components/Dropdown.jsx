import React from 'react'

export const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label className='form-label p-2 me-2'>
      {label}
      <select className='form-select' value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}
