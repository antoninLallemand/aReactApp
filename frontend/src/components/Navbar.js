import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'

function Navbar({toggleMenu}){
    return(
        <div className='navbar'>
            <div className='close-button'>
                <button onClick={toggleMenu}><b>&lt;</b></button>
            </div>
            <div>
            <h2>Menu :</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                exact to='/'  
                                activeClassName='active'
                                onClick = {toggleMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/page'
                                activeClassName='active'
                                onClick = {toggleMenu}>
                                Page
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar


//SET BUTTON IN A DIFFERENT COMPONENT AND HIDE/SHOW THE CONTENT