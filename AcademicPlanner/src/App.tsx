// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import Nav from './components/Nav';
import AlertPage from './pages/AlertPage';

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/alert' element={<AlertPage />} />
      </Routes>
    </Router>
  )
}

export default App
