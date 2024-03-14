import '../styles/App.css'
import Header from './Header'
import Home from './Home'
import Page from './Page'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'

function App() {

  const [menuWidth, setMenuWidth] = useState('1%')
  const [mainWidth, setMainWidth] = useState('99%')

  const toggleMenu=()=>{
    // if (menuWidth === "15%") {
    //   console.log('hide')
    //   setMenuWidth("0");
    //   setMainWidth("100%");
    // } else {
    //   console.log('show')
    //   setMenuWidth("15%");
    //   setMainWidth("85%");
    // }
    setMenuWidth(prevWidth => prevWidth === "1%" ? "15%" : "1%");
    setMainWidth(prevWidth => prevWidth === "99%" ? "85%" : "99%");
  }

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='app-content'>
          <div className='app-navbar' style={{ width: menuWidth }}>
            <Navbar toggleMenu={toggleMenu} menuWidth={menuWidth}/>
          </div>
          <div className='app-main-content' style={{ width: mainWidth }}>
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
