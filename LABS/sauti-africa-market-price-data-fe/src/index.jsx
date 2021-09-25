import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'
//import AppRouter
import AppRouter from '../src/appRouter/appRouter'

import './index.scss'
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'


Sentry.init({
  dsn: 'https://ed2c8b82501542498bcdb20ad95bac85@sentry.io/1779492'
})

const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'
document.head.appendChild(styleLink)


ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
