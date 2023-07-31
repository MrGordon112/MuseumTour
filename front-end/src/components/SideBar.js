import React, { useContext,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext'

const SideBar = props => {

    let {profile,user, logoutUser}=useContext(AuthContext)
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className={sidebarClass}>
{user?(

		    <ul>
                <li className='nav-item'>
                <Link
                    to='/myProfile'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    MyProfile
                </Link>
                </li>

                <li className='nav-item'>
                <Link
                    to='/museums'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Museums
                </Link>
                </li>

                {profile?.isAdministrator &&<li className='nav-item'>
                <Link
                    to='/myMuseums'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    MyMuseums
                </Link>
                </li>}

		        <li className='nav-item'>
		        <Link onClick={logoutUser}  className='nav-links'>
			        Logout
		        </Link>
		        </li>
            </ul>):(<ul>

                <li className='nav-item'>
                <Link
                    to='/museums'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Museums
                </Link>
                </li>



                <li className='nav-item'>
                <Link
                    to='/login'
                    className='nav-links '
                    onClick={closeMobileMenu}
                >
                    Login
                </Link>
                </li>

                <li className='nav-item'>
                <Link
                    to='/sign-up'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Sign Up
                </Link>
                </li>

            </ul>
		)}
    </div>
  )
};

export default SideBar;
