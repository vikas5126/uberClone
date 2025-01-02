import 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) =>{
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-40 mb-5 ml-[-1rem]' src="https://static.vecteezy.com/system/resources/previews/027/127/451/original/uber-logo-uber-icon-transparent-free-png.png" alt="" />
        <form onSubmit={submitHandler}>
          <div>
            <h3 className='text-lg mb-2 font-medium'>What&#39;s Your Email</h3>
            <input required 
              type="email" 
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              placeholder='email@example.com'
              className='px-4 py-2 bg-[#eeeeee] mb-7 rounded w-full border text-lg placeholder:text-base'
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
              className='px-4 py-2 bg-[#eeeeee] mb-7 rounded w-full border text-lg placeholder:text-base'
            />
          </div>

          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>

          <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <Link to='/login' className='bg-[#d5622d] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base flex justify-center items-center'>Sign in as User</Link>
    </div>
  )
}

export default CaptainLogin