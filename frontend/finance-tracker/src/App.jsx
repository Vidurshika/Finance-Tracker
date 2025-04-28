import React from 'react'
import { BrowserRouter as Router,Routes,Rooute,Navigate } from 'react-router-dom'

const App = () => {
  return (
    <div className='text-5xl'>
      <Router>
        <Route path="/" element={<Root/>}/>
        <Route path="/login" exact element={<LoginForm/>}/>
        <Route path="/" element={<Root/>}/>
      </Router>
    </div>
  )
}

export default App