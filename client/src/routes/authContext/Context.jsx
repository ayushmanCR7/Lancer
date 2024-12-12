import { createContext, useState,useEffect } from "react";


export const AuthContext = createContext(null);
export const AuthContextProvider = ({children})=>{
    
    const [currentUser,setcurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const updateUser = (data)=>{
        setcurrentUser(data)
    };
    useEffect(() => {
        sessionStorage.setItem("user",JSON.stringify(currentUser))
    }, [currentUser])
    return <>
    <AuthContext.Provider value = {{currentUser,updateUser}}>
        {children}

    </AuthContext.Provider>
    </>
    
}