import React, { useRef } from 'react'
import './index.scss'

const inputList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

const NumberInput = ({}) => {
  return (
    <ul className="number-input-wrapper">
      {inputList.map((v) => (
        <li key={v} className="number-input-item">
          {v}
        </li>
      ))}
    </ul>
  )
}

export default NumberInput
