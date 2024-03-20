import '../styles/Headband.css'
import React, {useEffect, useState} from 'react';

function Headband({logOut, toggleMenu}, ref) {
    
    //------------ get and render username in the headband--------------
    const [username, getUsername] = useState('')

    useEffect(()=>{
        getUsername(localStorage.getItem('username'))
    }, [])


    return(
        <div className='headband' ref={ref}>
            <div className='close-menu'>
                <button onClick={toggleMenu}><b>&gt;</b></button>
            </div>
            <div className='headerband-appname'>
                <h2>App name</h2>
            </div>
            <div className='headband-username'>
                <p><b>User : </b> {username}</p>
            </div>
            <div className='headband-logout'>
                <button onClick={logOut}>Log out</button>
            </div>
        </div>
    )
}

export default React.forwardRef(Headband)