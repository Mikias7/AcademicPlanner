import logo from '../../public/auLogo.png';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="w-full bg-[#001F3F] text-white flex items-center justify-between px-6 py-3 shadow-md">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="h-12 w-auto" />
        <h1 className="text-xl font-semibold text-[#FFD700]">Academic Planner</h1>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `text-lg hover:text-[#FFD700] ${isActive ? 'text-[#FFD700] font-semibold' : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/test" 
          className={({ isActive }) =>
            `text-lg hover:text-[#FFD700] ${isActive ? 'text-[#FFD700] font-semibold' : ''}`
          }
        >
          Test
        </NavLink>

        <NavLink 
          to="/test1" 
          className={({ isActive }) =>
            `text-lg hover:text-[#FFD700] ${isActive ? 'text-[#FFD700] font-semibold' : ''}`
          }
        >
          Test1
        </NavLink>

        <NavLink 
          to="/test2" 
          className={({ isActive }) =>
            `text-lg hover:text-[#FFD700] ${isActive ? 'text-[#FFD700] font-semibold' : ''}`
          }
        >
          Test2
        </NavLink>
      </div>
      
    </nav>
  );
}

export default Nav;
