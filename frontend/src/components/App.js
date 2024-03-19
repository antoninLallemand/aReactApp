import '../styles/App.css'
import Header from './Header'
import Login from './Login'
import Home from './Home'
import Page from './Page'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Router>
      <div className="App">
        <Header/>
        <Login/>
        <div className='app-content'>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Navbar toggleMenu={toggleMenu}/>
          </div>
          <div className='close-menu'>
            <button onClick={toggleMenu}><b>&gt;</b></button>
          </div>
          <div className='app-main-content'>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/page' element={<Page/>}/>
          </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
