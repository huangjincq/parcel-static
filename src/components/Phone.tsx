import React, { useRef, useState } from 'react'
import './index.scss'
import NumberInput from './NumberInput'

const Phone = ({}) => {
  const [inputNumber, setInputNumber] = useState('')

  const handleInputNumberChange = (val: string) => {
    setInputNumber(val)
  }

  const handleSendCall = () => {
    alert('send Call')
  }

  return (
    <div className="phone">
      <h4 className="phone-header"></h4>
      <div className="phone-input">{inputNumber}</div>
      <div className="phone-contact-name">Contact name</div>
      <NumberInput value={inputNumber} onChange={handleInputNumberChange} onSendCall={handleSendCall} />
    </div>
  )
}

export default Phone
