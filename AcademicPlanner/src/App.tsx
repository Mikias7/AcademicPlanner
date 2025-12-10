// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import Nav from './components/Nav';
// import AlertPage from './pages/AlertPage';
import CourseDescriptionPage from './pages/CourseDescriptionPage';
import EditPlanPage from './pages/EditPlanPage';

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/course' element={<CourseDescriptionPage />} />
        <Route path='/editPlan' element={<EditPlanPage />} />
      </Routes>
    </Router>
  )
}

export default App
