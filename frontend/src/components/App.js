import React from 'react'
import Dashboard from './Dashboard'

const App = () => (
  <div>
    <h1>Hello world</h1>
    <Dashboard
      data={[{ id: 'test', value: 100 }, { id: 'test2', value: 200 }]}
    />
  </div>
)

export default App
