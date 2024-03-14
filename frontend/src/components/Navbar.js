import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'

function Navbar({toggleMenu, menuWidth}){
    return(
        <div className='navbar'>
            <button onClick={toggleMenu}>Toggle Menu</button>
            {menuWidth !== "1%" && (
            <>
            <h2>Menu :</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink 
                            exact to='/'
                            activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/page'
                            activeClassName='active'>
                            Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
            </>
            )}
        </div>
    )
}

export default Navbar


//SET BUTTON IN A DIFFERENT COMPONENT AND HIDE/SHOW THE CONTENT