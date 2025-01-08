import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vechicleCapacity, setVehicleCapacity] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  const captainContext = useContext(CaptainDataContext);
  const setCaptain = captainContext ? captainContext.setCaptain : () => {};
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        vehicleType: vehicleType,
        capacity: vechicleCapacity,
        plate: vehiclePlate,
      }
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData);
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleType('');
    setVehicleColor('');
    setVehicleCapacity('');
    setVehiclePlate('');
  };

  return (
    <div className='p-5 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-40 mb-2 ml-[-1rem] mt-[-1rem]' src="https://static.vecteezy.com/system/resources/previews/027/127/451/original/uber-logo-uber-icon-transparent-free-png.png" alt="" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2 font-medium'>What&#39;s Your Name</h3>
          <div className='flex gap-4 mb-7'>
            <input required 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
            />
            <input  
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
            />
          </div>
          <h3 className='text-lg mb-2 font-medium'>What&#39;s Your Email</h3>
          <input required 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@example.com'
            className='px-4 py-2 bg-[#eeeeee] mb-5 rounded w-full border text-lg placeholder:text-base'
          />
          <h3 className='text-lg mb-2 mt-4 font-medium'>Password</h3>
          <input type="password" 
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-4 py-2 bg-[#eeeeee] mb-5 rounded w-full border text-lg placeholder:text-base'
          />
          <h3 className='text-lg mb-2 font-medium'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input required 
              type="text" 
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder='Vehicle Color'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
            />
            <select
              required
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="bike">Bike</option>
            </select>
          </div>
          <div className='flex gap-4 mb-7'>
            <input required 
              type="number" 
              value={vechicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder='Vehicle Capacity'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
            />
            <input required 
              type="text" 
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder='Vehicle Plate'
              className='px-4 py-2 bg-[#eeeeee] rounded border text-lg placeholder:text-base w-1/2'
            />
          </div>
          <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
          <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
        </form>
      </div>
      <p className='text-[10px] leading-tight mt-10 pb-5'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
    </div>
  );
};

export default CaptainSignup;