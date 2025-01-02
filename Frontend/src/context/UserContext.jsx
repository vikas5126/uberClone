import {createContext, useState} from 'react'

export const UserDataContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserContext = ({children}) => {
    const [user, setUser] = useState({
        email: '',
        fullName:{
            firstName: '',
            lastName: ''
        }
    })
  return (
    <div>
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}
