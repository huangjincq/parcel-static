import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const TwoFa = ({ preToken }) => {
  const onVerifySuccess = () => {
    sendMessage({
      errorCode: 0,
      errorMessage: '',
      data: { token: 'token-xxxxx' },
    })
  }

  const onVerifyError = () => {
    sendMessage({ errorCode: 1, errorMessage: 'TimeOut' })
  }

  const sendMessage = (data) => {
    const customEvent = new CustomEvent('TWO_FA_EVENT', { detail: data })
    window.dispatchEvent(customEvent)
  }

  return (
    <div>
      <h2>
        PreToken: <b>{preToken}</b>
      </h2>
      <button onClick={onVerifySuccess}>Verify Success</button>
      <button onClick={onVerifyError}>Verify Error</button>
    </div>
  )
}
TwoFa.propTypes = {
  preToken: PropTypes.string.isRequired,
}

export default TwoFa
