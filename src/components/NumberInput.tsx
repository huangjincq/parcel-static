import React, { useRef } from 'react'
import './index.scss'
import sendCall from '../imgs/send-call.png'

const inputList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

const clearKey = 'X'
const callKey = 'Call'

interface NumberInputProps {
  value: string
  onChange: (val: string) => void
  onSendCall: () => void
}

const NumberInput = ({ value, onChange, onSendCall }: NumberInputProps) => {
  const handleClickNumber = (val: string) => {
    switch (val) {
      case '*':
        break
      case '#':
        break
      case clearKey:
        value.length > 0 && onChange(value.substring(0, value.length - 1))
        break
      case callKey:
        onSendCall()
        break

      default:
        onChange(value + val)
        break
    }
  }

  return (
    <ul className="number-input-wrapper">
      {inputList.map((v) => (
        <li
          key={v}
          className="number-input-item"
          onClick={() => {
            handleClickNumber(v)
          }}
        >
          {v}
        </li>
      ))}
      <li className="number-input-item none"></li>
      <li
        className="number-input-item"
        onClick={() => {
          handleClickNumber(callKey)
        }}
      >
        <img className="phone-send-call" src={sendCall} alt="" />
      </li>
      <li
        className="number-input-item"
        onClick={() => {
          handleClickNumber(clearKey)
        }}
      >
        {clearKey}
      </li>
    </ul>
  )
}

export default NumberInput
