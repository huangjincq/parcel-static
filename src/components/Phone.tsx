import React, { useRef } from 'react'
import './index.scss'
import NumberInput from './NumberInput'
import sendCall from '../imgs/send-call.png'

const Phone = ({}) => {
  return (
    <div className="phone">
      <h4 className="phone-header"></h4>
      <div className="phone-input">734 652 4046</div>
      <div className="phone-contact-name">Contact name</div>
      <NumberInput />
      <div className="phone-send-call">
        <img src={sendCall} alt="" />
      </div>
    </div>
  )
}

export default Phone
