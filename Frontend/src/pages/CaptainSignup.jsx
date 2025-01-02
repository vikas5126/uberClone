import 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [userData, setUserData] = useState({});

  const submitHandler = (e) =>{
    e.preventDefault();

    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  return (
    <div className='p-5 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-40 mb-5 ml-[-1rem]' src="https://static.vecteezy.com/system/resources/previews/027/127/451/original/uber-logo-uber-icon-transparent-free-png.png" alt="" />
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

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>SignUp</button>

          <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
        </form>
      </div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
  )
}

export default CaptainSignup