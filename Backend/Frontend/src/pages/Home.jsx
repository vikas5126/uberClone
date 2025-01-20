import 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1104,w_1104/v1683919251/assets/42/a29147-e043-42f9-8544-ecfffe0532e9/original/travel-ilustra.png)] h-screen w-full flex flex-col justify-between pt-5 pl-5' >
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' className='w-16 ml-8' alt='Uber Logo' />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'  to='/login'>Continue</Link> 
            </div>
        </div>
    </div>
  )
}

export default Home
