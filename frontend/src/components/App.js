import '../styles/App.css'
import Header from './Header'
import Login from './Login'
import Headband from './Headband'
import Home from './Home'
import Page from './Page'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

function App({location}) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //get credentials in local storage to avoid reconnection each page change or reload
  useEffect(() => {
    // Retrieve isAuthenticated state from local storage on component mount
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
    setRender(true) //render headband at reload
  }, []); // Empty dependency array ensures this effect runs only once on mount

  
  //-------------------Function to handle successful login---------------------
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
  };


  //------------------------Function to handle logout---------------------------
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Remove isAuthenticated state from local storage
    localStorage.removeItem('isAuthenticated');
  };


  //-----function called when a permission is requested accessing a ressource-----
  const handleProtectedRequest = async () => {
    try {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    console.log('search for token : ', token)

    // Check if token exists
    if (!token) {
      console.error('Token not found');
      setIsAuthenticated(false)
      return;
    }
      const response = await fetch('/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Unauthorized');
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };


  //---------------------get heigth of the headband div----------------------
  const headbandRef = useRef(null);
  const [headbandHeight, setHeadbandHeight] = useState(0);
  const [render, setRender] = useState(false)

  useEffect(() => {
    // Calculate and set the height of the headband
    if (headbandRef.current) {
      const height = headbandRef.current.clientHeight;
      console.log('height useeff : ', height)
      setHeadbandHeight(height);
    }
  }, [location.pathname, render]); //render each reload and location change


  //------------------------------handle menu-----------------------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Router>
      <div className="App">
        {!isAuthenticated &&(
        <>
          <Header/>
          <Login onLoginSuccess={handleLoginSuccess}/>  
        </>
        )}
        {isAuthenticated && (
          <div className='app-content'>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
              <Navbar toggleMenu={toggleMenu}/>
            </div>
              <Headband logOut={handleLogout} toggleMenu={toggleMenu} ref={headbandRef}/>
            <div className='app-main-content' style={{ marginTop: `${headbandHeight}px` }}>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/page' element={<Page getPermission={handleProtectedRequest}/>}/>
            </Routes>
            </div>
          </div>
        )}
        {!isAuthenticated && <Navigate to="/" />}
      </div>
    </Router>
  );
}

export default App;
