import ReactDOM from 'react-dom/client'

import React from 'react'
import TwoFa from './src/components/TwoFa'
import reactToWebComponent from 'react-to-webcomponent'

customElements.define('two-fa', reactToWebComponent(TwoFa, React, ReactDOM))
