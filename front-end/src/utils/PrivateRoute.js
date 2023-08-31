import React,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import  {
  HashRouter as Router,
  Route,
  Routes
    } from 'react-router-dom'

const PrivateRoute = () => {
    let {user}=useContext(AuthContext) // determine if authorized, from context or however you're doing it
    let auth = false
    console.log('it is what it is')
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
     return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute