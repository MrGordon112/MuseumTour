import './Login.css';
import React, {useContext, useState} from 'react'
import AuthContext from  '../context/AuthContext'
import './MyProfile.css';

import { Link } from 'react-router-dom';

const LoginPage=()=>{
    let {loginUser}=useContext(AuthContext)
    return (
    <div>
     <div class="main">

        <section className="sign-in">
            <div className="container">
                <div className="signin-content">

                <div className="signin-image">
                 <figure><img src="images/signin-image.jpg" alt="sing up image"></img></figure>
                 <Link to='/sign-up' class="signup-image-link">Create an account</Link>

</div>
                        <h2 class="form-title h2_class">Login</h2>
<div class="signin-form">
        <form onSubmit={loginUser} class="register-form" id="login-form">
         <div class="form-group">
                <input type="text" name="username" className="action_username" id="your_name" placeholder="enter username" />
                </div><div class="form-group">
                </div><input type="password" id="your_pass" className="action_password" name="password" placeholder="enter password" />
                <div class="form-group form-button"><input type="submit" id="signin" class="form-submit" /></div>

        </form>
</div>
        </div>
            </div>
        </section>
        </div>
    </div>
    )
}

export default LoginPage