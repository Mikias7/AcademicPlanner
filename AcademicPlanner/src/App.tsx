import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Nav from './components/Nav';
import AlertPage from './pages/AlertPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/alert' element={<AlertPage />} />
      </Routes>
    </Router>
  )
}

export default App
