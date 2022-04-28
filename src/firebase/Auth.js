import React, {useEffect, useState } from "react"
import { auth } from '.'
import { Loader } from "../components"
import User from "../db/User"

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

     useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (!!user) {
                let userInfo = await User.getUserByUid(user.uid)
                setCurrentUser(userInfo)
            } else {
                setCurrentUser(user)
            }
            setPending(false)
        })
    }, [])

    if(pending){
        return (
            <Loader/>
        )
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
        {children}
        </AuthContext.Provider>
    )
}