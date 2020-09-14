import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
import 'normalize.css'
import App from './App.js'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

let commit = process.env.COMMIT_REF
let config = {
  dsn:
    'https://faad86b5e28f4f6592dcfadff67fcdb2@o447635.ingest.sentry.io/5427710',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  release: commit ? commit : "LOCAL"
}

Sentry.init(config)
console.log(commit)
console.log(config)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
