import ReactDOM from 'react-dom/client'

import React from 'react'
import TwoFa from './components/TwoFa'
import reactToWebComponent from 'react-to-webcomponent'

export function App() {
  return <h1>{/* <Counter /> */}</h1>
}

customElements.define('two-fa', reactToWebComponent(TwoFa, React, ReactDOM))
