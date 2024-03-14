import { useState, useEffect } from "react"
import '../styles/Page.css'

function Page(){

    const [message, getMessage] = useState({file : {
        text: 'loading',
        count: 0
    }})
    const [refresh, handleRefresh] = useState(false)

    useEffect(()=>{
        fetch('/api/server')
        .then(response => response.json())
        .then(data => getMessage(data))
        .catch(error => console.error('Error importing sensorList.json:', error))
        handleRefresh(false)
    },[refresh])

    const onClick =()=>{
        message.file.count++
        console.log(message)
        const strMessage = JSON.stringify(message)
        fetch('/api/button', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: strMessage
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send data');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
        })
        handleRefresh(true)
    }

    return(
        <div className="page">
            <p>{message.file.text}</p>
            <button onClick={onClick}>{message.file.count}</button>
        </div>
    )
}

export default Page