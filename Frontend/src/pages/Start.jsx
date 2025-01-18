import React, { useContext, useEffect } from 'react'
import axios from "axios"
import { useState, useRef } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Start = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  
  const [panelOpen, setPanelOpen] = useState(false);
  const [VehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [ activeField, setActiveField ] = useState(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  const navigate = useNavigate();


  useEffect(() => {
    // console.log(user.user._id);
      socket.emit("join", { userType: "user", userId: user.user._id })
  }, [ user ])

  socket.on('ride-confirmed', ride => {
      setVehicleFound(false)
      setWaitingForDriver(true)
      setRide(ride)
  })

  socket.on('ride-started', ride => {
      console.log("ride")
      setWaitingForDriver(false)
      navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })
  const handlePickupChange = async (e) => {
    console.log(localStorage.getItem('token'));
      setPickup(e.target.value)
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }

          })
          setPickupSuggestions(response.data)
      } catch(error) {
        console.log(error);
          // handle error
      }
  }

  const handleDestinationChange = async (e) => {
      setDestination(e.target.value)
      try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
              params: { input: e.target.value },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          setDestinationSuggestions(response.data)
      } catch {
          // handle error
      }
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current, {height: '70%', duration: 0.5})
      gsap.to(panelCloseRef.current, {opacity: 1, duration: 0.5})
    }else{
      gsap.to(panelRef.current, {height: '0%', duration: 0.5})
      gsap.to(panelCloseRef.current, {opacity: 0, duration: 0.5})
    }
  }, [panelOpen])

  useGSAP(function(){
    if(VehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)',
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [VehiclePanelOpen])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)',
      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)',
      })
    }else{
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ waitingForDriver ])

  async function findTrip() {
    setVehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: { pickup, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })


    setFare(response.data)


  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
        pickup,
        destination,
        vehicleType
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(response.data);
}
  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src='https://logospng.org/download/uber/logo-uber-4096.png' />

      <div className='h-screen w-screen'>
        {/* <img className='h-full w-full object-cover' src="https://oxa.tech/_nuxt/image/a7a19b.jpeg" alt="" /> */}
        <LiveTracking/>
      </div>
      <div className='absolute top-0 w-full h-screen flex flex-col justify-end'>
        <div className='h-[37%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{setPanelOpen(false)}} className='absolute top-4 right-6 text-2xl opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form action="#" className='mt-4' onSubmit={(e)=>submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[34%] left-10 bg-gray-800 rounded-full'></div>
            <input 
              onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
              value={pickup}
              onChange={handlePickupChange} 
              type="text" placeholder='Enter Your Pickup Point' className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-4'/>
            <input 
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange} 
              type="text" placeholder='Enter Your Destination' className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-4'/>
          </form>
          <button
              onClick={findTrip}
              className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
              Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-[0%]'>
          <LocationSearchPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel selectVehicle={setVehicleType} setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel} fare={fare}/>
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <ConfirmRide createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <LookingForDriver 
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType} 
            setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver
              // setVehicleFound={setVehicleFound}
              // setWaitingForDriver={setWaitingForDriver}
              waitingForDriver={waitingForDriver}
              ride={ride}
              />
              
      </div>
    </div>
  )
}

export default Start