import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for navigation
import axios from 'axios';
import logo from '../images/newssutra.png';

const Login = () => {
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username,  // Changed to username field
        password,
      });

      // Save JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to the home page
      navigate('/home');
    } catch (error) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="flex h-screen ">
      
      <div className="w-1/2 flex flex-col justify-center items-center bg-transparent ">
        <img src="https://www.zmo.ai/wp-content/uploads/2023/09/abstract-defocused-black-background-with-gold-particles.jpg" alt="background" className="relative object-cover h-screen w-screen" />
        
        <div className="absolute">
          <h1 className="text-4xl justify-center flex text-green-400 font-bold mb-4">Welcome back</h1>
          <p className="mt-5 text-green-400 justify-center flex font-bold mb-4">Please enter your details.</p>
          <Link to="/home">
            <button type="button" className="mb-4 ml-14 text-blue-500 font-semibold bg-white px-4 py-2 rounded-xl hover:bg-blue-700">
              Log in with Google
            </button>
          </Link>

          <div className="my-2 font-bold text-white text-center">or</div>

          <form onSubmit={handleLogin} className="w-full max-w-xs text-white font-bold font-sans ">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full border text-black border-gray-300 p-2 rounded-2xl"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Set username
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm  font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border text-black border-gray-300 p-2 rounded-2xl"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set password
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm">
                  Remember for 30 days
                </label>
              </div>
              <Link to="/home" className="text-sm text-green-300 hover:text-white hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Log in
            </button>
            
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            
            <div className="text-center mt-4">
              Don't have an account?{' '}
              <Link to="/home" className="text-green-300 hover:text-white hover:underline">
                Sign up for free
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 flex justify-center bg-gradient-to-r from-black to-yellow-200 items-center  p-4">
        <img src={logo} alt="News Sutra" className="max-w-screen h-auto bg-transparent object-contain" />
      </div>
    </div>
  );
};

export default Login;
