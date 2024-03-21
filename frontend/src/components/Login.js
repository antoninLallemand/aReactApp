import '../styles/Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({onLoginSuccess}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Hook to perform navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
        username : username === ''? 'void':username,
        password : password === ''? 'void':password
    }
    
    try {
      const response = await fetch('/api/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        // const { token } = await response.json();
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token securely
        // Redirect the user to the authenticated page
        onLoginSuccess()
        localStorage.setItem('username', username);
        // navigate('/');
        window.location.href = '/home';
      } else {
        // Handle incorrect credentials
        console.error('Invalid credentials');
        setErrorMessage('Invalid credentials, please retry')
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed, please retry')
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <label for='username'>Username : </label>
        <input
          id='username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for='password'>Password : </label>
        <input
          id='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <p className='login-error-message'><b>{errorMessage}</b></p>
    </div>
  );
};

export default Login;