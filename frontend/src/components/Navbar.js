import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'

function Navbar({toggleMenu}){
    return(
        <div className='navbar'>
            <div className='navbar-fixed'>
                <div className='navbar-title'>
                    <h2>Menu :</h2>
                </div>
                <div className='close-button'>
                    <button onClick={toggleMenu}><b>&lt;</b></button>
                </div>
            </div>
            <div className='navbar-mobile'>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                exact to='/'  
                                activeclassname='active'
                                onClick = {toggleMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/page'
                                activeclassname='active'
                                onClick = {toggleMenu}>
                                Page
                            </NavLink>
                        </li>
                        {/* <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li>
                        <li>
                            <a>hello</a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar


//SET BUTTON IN A DIFFERENT COMPONENT AND HIDE/SHOW THE CONTENT