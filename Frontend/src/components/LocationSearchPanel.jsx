import React from 'react'

// eslint-disable-next-line react/prop-types
const LocationSearchPanel = ({setVehiclePanel, setPanelOpen}) => {
  return (
    <div className='pt-4 pl-4' onClick={()=>{ setVehiclePanel(true); setPanelOpen(false); }}>
        <div className='flex items-center justify-start'>
            <h2 className='bg-[#eee] h-8 w-8 rounded-full flex items-center justify-center mr-2'><i className='ri-map-pin-fill'></i></h2>
            <h4 className='font-medium '>g-838, shakur pur , delhi-110034</h4>
        </div>
    </div>
  )
}

export default LocationSearchPanel