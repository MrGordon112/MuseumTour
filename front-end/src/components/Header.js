

import React, { useContext,useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext'
import './Header.css';

const Header = props=>{

    let {profile,user, logoutUser}=useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    showButton()
  }, []);



  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };


  window.addEventListener('resize', showButton);

  return (

      <nav className='navbar'>
        <div className='navbar-container'>

         <button className="openbtn display" onClick={props.onClick}>☰</button>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MuseumsTour
            <i className='fab fa-typo3' />
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

{user?(
		 <ul className={click ? 'nav-menu active' : 'nav-menu'}>
<li className='nav-item'>
              <Link
                to='/uploadPhoto'
                className='nav-links dont-display'
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/myProfile'
                className='nav-links dont-display'
                onClick={closeMobileMenu}
              >
                MyProfile
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/museums' className='nav-links dont-display' onClick={closeMobileMenu}>
                Museums
              </Link>
            </li>

		{profile?.isAdministrator && <li className='nav-item dont-display'>
              <Link  className='nav-links'
                to='/myMuseums'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                MyMuseums
              </Link>
            </li>}
		    <li   className='nav-item dont-display'>
		        <Link className='nav-links' onClick={logoutUser}>
			        Logout
		        </Link>
		    </li>

		</ul>):(
		 <ul className={click ? 'nav-menu active' : 'nav-menu'}>
<li className='nav-item'>
              <Link
                to='/'
                className='nav-links dont-display'
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/museums' className='nav-links dont-display' onClick={closeMobileMenu}>
                Museums
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links dont-display'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile dont-display'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            </ul>
		)}

          {button && !user &&<Link to='/sign-up' className='btn-mobile'> <Button buttonStyle='btn--outline'>SIGN UP</Button></Link>}

        </div>
      </nav>

  );
};
export default Header;