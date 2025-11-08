import {  redirect, useFetcher, } from "react-router";
import { FaGoogle } from 'react-icons/fa';
import type { Route } from "./+types/create-post";

import {signInWithPopup, } from 'firebase/auth'
import { auth, provider } from "~/config/firebase";
import type React from "react";
import { adminAuth } from "~/config/admin-config";
import { commitSession, getSession } from "~/config/session";
import InitialNav from "~/component/login-Nav";


export async function action({request}:Route.ActionArgs) {
    const formData = await request.formData()
    const userToken = formData.get('token')
    const session = await getSession()

    

    if( typeof userToken === 'string'){
    const verifyToken = await adminAuth.verifyIdToken(userToken)
    
     if(verifyToken){

        session.set('userToken',verifyToken)

      return  redirect('/',{
            headers:{
                "Set-Cookie": await commitSession(session)
            }
        })
     }else{
       return  redirect('/login')
     }



   

}
    
return  redirect('/login')
}





export default function LoginPage (){

    const featcher = useFetcher()


 const contiueWithGoogle = async(event: React.FormEvent<HTMLElement>)=>{
    event.preventDefault()
    
    console.log('ined')

    const formData = new FormData(event.target as HTMLFormElement)

try {
   const sigIned = await signInWithPopup(auth,provider)
    const token = await sigIned.user.getIdToken()
    formData.append('token', token)

   
console.log(token,'usertoken here')
featcher.submit(formData,{method:'post'})

} catch (e) {
console.log((e as Error).message, 'failed to login with google')
    
}

 

}
    

    return(
<>
            <InitialNav/>

<div className="l-big">
<h1 className="login-intro">
   Finally, a place for your worst thoughts. Login to start.
</h1>
        <div className="login-box">
      
      {/* <Form className="login-form">
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
    <input type="submit" value='login'  className="login-input login-btn"/>
</div>


</div>
      </Form> */}


      <div className="g-contiue">
<featcher.Form onSubmit={contiueWithGoogle}>
    <div className="g-inner">
 
   <div className="c-btn"><button type="submit" >contiue with <FaGoogle className="google-icon"/></button></div>
</div>
</featcher.Form>
</div>
        
        </div>
        </div>
        </>
    )
}