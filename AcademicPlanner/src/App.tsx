import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Nav from './components/Nav';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
