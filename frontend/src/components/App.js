import React from 'react'
import Login from './Login'

const App = () => {
  if (loggedIn()) {
    return <Main />
  }
  return <Login />
}

export default App
