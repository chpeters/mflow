import React from 'react'
import Dashboard from './Dashboard'
import { Flex, Box } from 'rebass'

const App = () => (
  <>
    <Flex justifyContent="center">
      <Box>
        <h1>Hello world</h1>
      </Box>
    </Flex>
    <Flex justifyContent="center">
      <Dashboard
        data={[{ id: 'test', value: 100 }, { id: 'test2', value: 200 }]}
      />
    </Flex>
  </>
)

export default App
