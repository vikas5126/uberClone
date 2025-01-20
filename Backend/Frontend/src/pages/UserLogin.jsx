import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';


const UserLogin = () => {
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const userContext = useContext(UserDataContext)
  const setUser = userContext ? userContext.setUser : () => {}
  const navigate = useNavigate();

  const submitHandler = async (e) =>{
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status === 200){
      const data = response.data
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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

          <p className='text-center'>new here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </form>
      </div>
      <Link to='/captain-login' className='bg-[#10b461] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base flex justify-center items-center'>Sign in as Captain</Link>
    </div>
  )
}

export default UserLogin