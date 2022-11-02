import React, { useRef } from 'react'

import PropTypes from 'prop-types'

const TwoFa = ({ preLoginResponse, language }) => {
  const domRef = useRef()

  const onVerifySuccess = () => {
    const customEvent = new CustomEvent('success', { detail: { token: 'token-xxxxx' } })
    domRef.current.parentNode.dispatchEvent(customEvent)
  }

  const onVerifyError = () => {
    const customEvent = new CustomEvent('error', { detail: { errorCode: 1, errorMessage: 'TimeOut' } })
    domRef.current.parentNode.dispatchEvent(customEvent)
  }

  return (
    <div ref={domRef}>
      <h2>preLoginResponse: {preLoginResponse}</h2>
      <hr />
      <h3>language: {language}</h3>
      <button onClick={onVerifySuccess}>Verify Success</button>
      <button onClick={onVerifyError}>Verify Error</button>
    </div>
  )
}

// 必须要这个 不然 props 传不进来
TwoFa.propTypes = {
  preLoginResponse: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}

export default TwoFa
