import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import Nav from './components/Nav';
import CourseDescriptionPage from './pages/CourseDescriptionPage';
import EditPlanPage from './pages/EditPlanPage';

function App() {
  return (
    <BrowserRouter basename="/AcademicPlanner">
      <Nav />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/course" element={<CourseDescriptionPage />} />
        <Route path="/editPlan" element={<EditPlanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
