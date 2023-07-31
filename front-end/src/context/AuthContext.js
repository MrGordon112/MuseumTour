import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [user,setUser]=useState(() => localStorage.getItem('authTokens')? jwt_decode(localStorage.getItem('authTokens')): null)
    let [profile,setProfile]=useState(()=>localStorage.getItem('profile')? JSON.parse(localStorage.getItem('profile')): null)
    let[authTokens,setAutTokens]=useState( () => localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null)
    let[loading,setLoading]= useState(true)

    let history=useNavigate()

     let getProfile = async()=>{
             let response =await fetch('http://127.0.0.1:8000/museums/profile/'+user?.user_id)
             let data = await response.json()
              localStorage.setItem('profile',JSON.stringify(data))
              setProfile(data)
              setProfile(data)
            }

    useEffect(()=>{
    getProfile()
    },[user])

    let refreshUser=()=>{getProfile()}


    let loginUser = async (e )=> {

        console.log('form submited')
        e.preventDefault()
        let response=await fetch('http://127.0.0.1:8000/museums/token/',{
        method:'POST',
        headers:{
        'Content-Type':'application/json'
         },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
             })
             let data=await response.json()
             if(response.status===200)
             {
             setAutTokens(data)
             console.log(jwt_decode(data.access))
             localStorage.setItem('authTokens',JSON.stringify(data))
             setUser(jwt_decode(data.access))
             history('/')
             getProfile()
           }

             else{
             alert('Something went wrong!')}
}
    let logoutUser=() => {
        setAutTokens(null)
        setUser(null)
        setProfile(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('profile')
        history('/')
    }

    let updateToken  = async () =>{
    console.log('update token call')
    let response=await fetch('http://127.0.0.1:8000/museums/token/refresh/',{
        method:'POST',
        headers:{
        'Content-Type':'application/json'
         },
            body:JSON.stringify({'refresh':authTokens.refresh})
             })
             let data=await response.json()

             if(response.status===200){
             setAutTokens(data)
             setUser(jwt_decode(data.access))
             localStorage.setItem('authTokens',JSON.stringify(data))

             }else
             {
                logoutUser()
             }
    }

    let contextData= {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        profile:profile,
        refreshUser:refreshUser
        }

    useEffect(()=>{
        let interval = setInterval(()=>{
        if(authTokens){
        updateToken()
        }
        },2000000)
        return () => clearInterval(interval)

    },[authTokens,loading])

return (
    <AuthContext.Provider value ={contextData}>
        {children}
     </AuthContext.Provider>

)
}