import 'unfetch/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import App from './components/App/App'
import './setup-icons'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { LanguageProvider } from './contexts/LanguageContext';
ReactDOM.render(
  <BrowserRouter>
    <LanguageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LanguageProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()