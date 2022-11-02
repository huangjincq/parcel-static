import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import event from '../event'

const Counter = ({ defaultValue = 0 }) => {
  const [count, setCount] = useState(defaultValue)

  useEffect(() => {
    const customEvent = new CustomEvent(event.react.actualValue, { detail: count })
    window.dispatchEvent(customEvent)
  }, [count])

  const onInc = () => {
    setCount((prev) => prev + 1)
    const customEvent = new CustomEvent(event.react.incValue, { detail: count })
    window.dispatchEvent(customEvent)
  }

  const onDec = () => {
    setCount((prev) => prev - 1)
    const customEvent = new CustomEvent(event.react.decValue, { detail: count })
    window.dispatchEvent(customEvent)
  }

  return (
    <>
      <h2>
        Counter: <b>{count}</b>
      </h2>
      <button onClick={onInc}>Increment</button>
      <button onClick={onDec}>Decrement</button>
    </>
  )
}
Counter.propTypes = {
  defaultValue: PropTypes.string.isRequired,
}

export default Counter
