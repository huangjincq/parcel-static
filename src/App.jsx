import ReactDOM from 'react-dom/client'

import React from 'react'
import Counter from './components/Counter'
import reactToWebComponent from 'react-to-webcomponent'

export function App() {
  return (
    <h1>
      hello react webcomponent
      {/* <Counter /> */}
    </h1>
  )
}

customElements.define('react-counter', reactToWebComponent(Counter, React, ReactDOM))
