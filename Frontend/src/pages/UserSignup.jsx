import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext} from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);

  const submitHandler = async (e) =>{
    e.preventDefault();

    // setUserData()

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    // const response = await axios.post('http://localhost:4000/users/register', newUser)

    if(response.status === 200){
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);

      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={submitHandler}>
            <h3 className='text-lg mb-2 font-medium'>What&#39;s Your Name</h3>
            <div className='flex gap-4 mb-7'>
            <input required 
              type="text" 
              value={firstName}
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
              placeholder='First Name'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
              />
              <input  
              type="text" 
              value={lastName}
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
              placeholder='Last Name'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
              />
            </div>
          <div>
            <h3 className='text-lg mb-2 font-medium'>What&#39;s Your Email</h3>
            <input required 
              type="email" 
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              placeholder='email@example.com'
              className='px-4 py-2 bg-[#eeeeee] mb-5 rounded w-full border text-lg placeholder:text-base'
              />
          </div>

          <div>
            <h3 className='text-lg mb-2 mt-4 font-medium'>Password</h3>
            <input type="password" 
              placeholder='password'
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              className='px-4 py-2 bg-[#eeeeee] mb-5 rounded w-full border text-lg placeholder:text-base'
            />
          </div>

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>

          <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
        </form>
      </div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
  )
}

export default UserSignup