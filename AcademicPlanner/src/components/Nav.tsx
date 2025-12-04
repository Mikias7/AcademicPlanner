import logo from '../../public/auLogo.png';
import { NavLink, useNavigate } from 'react-router-dom';

function Nav(){

    // const navigate = useNavigate();

    return (
        <div>
            <div>
                <img src={logo} alt='logo' />
            </div>

            <div>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/test'>Test</NavLink>
            </div>

        </div>
    )
}

export default Nav;