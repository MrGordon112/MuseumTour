import React, { useState } from "react";
import Header from './components/Header';
import './App.css';
import  {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import {AuthProvider} from  './context/AuthContext'
import PrivateRoute from './utils/PrivateRoute'

import SideBar from "./components/SideBar";
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyProfileEdit from './pages/MyProfileEdit';
import Museums from './pages/Museums';
import MyMuseums from './pages/MyMuseums';
import AddMuseum from './pages/AddMuseum'
import MuseumDetail from './pages/MuseumDetail'
import PostDetail from './pages/PostDetail'
import AddPost from './pages/AddPost'

function App() {
const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div>

      <Router>
         <AuthProvider>
        <Header onClick={handleViewSidebar}/>
        <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
       <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/museums' element={<Museums/>} />
          <Route exact path='/myProfile' element={<MyProfile/>} />
          <Route exact path='/myProfileEdit' element={<MyProfileEdit/>} />
          <Route path='/myMuseums' element={<MyMuseums/>} />
          <Route path='/addMuseum' element={<AddMuseum/>} />
          <Route path = "/museums/:id" element={<MuseumDetail/>} />
          <Route path = "/posts/:id" element={<PostDetail/>} />
          <Route path='/addPost/:id' element={<AddPost/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/sign-up' element={<SignUpPage/>} />
                </Routes>
         </AuthProvider>
      </Router>
   </div>
  );
}

export default App;
