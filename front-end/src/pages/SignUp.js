import React,{useContext, useState} from 'react'
import AuthContext from  '../context/AuthContext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

const SignUpPage=()=>{
    let navigate=useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
    let {name, }= useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });


 const signUp=async()=> {
        let response=axios.post('/museums/register/',formData)
        .then((response)=>{
            if(response.status!=200){
                throw new Error('not added')
            }


        }
        ).catch((e)=>{console.log(e)})
        navigate("/login")
    }

    return (
        <div class="main">
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title h2_class">Sign up</h2>

            <form onSubmit={signUp} class="register-form" id="register-form">
                    <div class="form-group">
                    <label> </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='last_name'
                        class="action_username"
                        value={formData.last_name}
                        onChange={(event) => setFormData({...formData, username: event.target.value})}
                        required
                    />
                </div>
 <div class="form-group">
                    <label></label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        class="action_email"
                        value={formData.email}
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                        required
                    />
</div>

<div class="form-group">
                    <label></label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        class="action_password"
                        value={formData.password}
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                        minLength='6'
                        required
                    />
</div>

 <div class="form-group">
                    <label></label>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm Password*'
                            name='password2'
                            class="action_password2"
                            value={formData.re_password}
                            onChange={(event) => setFormData({...formData, password2: event.target.value})}
                            minLength='6'
                            required
                        />
                        </div>
                <div class="form-group form-button"> <input type='submit' text="send" id="signin" class="form-submit"/></div>

        {errorMessage && <div className="error"> {errorMessage} </div>}
            </form>
            </div>
              <div class="signup-image">
                        <figure><img src="https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fsignup-image.jpg?alt=media&token=5b3788c7-1da4-484c-ae78-344f5a166a6a" alt="sing up image"></img></figure>
                       <Link to='/login' class="signup-image-link">Already a member?</Link>
                    </div>
</div>
</div>
</section>
</div>
    );
};



export default SignUpPage
