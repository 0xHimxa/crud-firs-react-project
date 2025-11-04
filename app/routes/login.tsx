import { Form } from "react-router";
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage (){


    return(
        <div className="login-box">
      
      <Form className="login-form">
        <div className="login-center">
<div className="sp-input">
    <label htmlFor="email" className="login-label">Email</label>

    <input name='email' id='email' type="text"  className="login-input"/>
</div>

<div className="sp-input">
    <label htmlFor="password" className="login-label">Password</label>

    <input name='password' id='password' type="password"  className="login-input"/>
</div>

<div >
    <input type="button" value='login'  className="login-input login-btn"/>
</div>

<div className="g-contiue">
<div className="g-inner">
   <p > OR</p>
   <div className="c-btn"><button>contiue with <FaGoogle className="google-icon"/></button></div>
</div>
</div>
</div>
      </Form>
        
        </div>
    )
}