import { NavLink, useFetcher } from "react-router";
import '../app.css'

import { auth } from "~/config/firebase";
import { signOut } from "firebase/auth";

type IsShow = {
    show:boolean
}
export default function Navbar({show}: IsShow){

console.log(show,'from nav')

const fecter = useFetcher()


const logOut= async()=>{
  try {
     await  signOut(auth)
console.log('inn')
return
  } catch (error) {
    console.error(error)
  }
}



    return(
<div className="nav-box">
    <div className="nav-title">Shit-Posting Social</div>
    <div className="nav-link">
        <NavLink to='/' className={({isActive})=> isActive? 'links login add-red': 'links login'}>Home</NavLink>
       
        <NavLink to='/createpost' className={({isActive})=> isActive? 'links login add-red': 'links login'}>shit post</NavLink>
 
</div>


 <div className="current-user">

    
<p>Himxa</p>
<div className="l-btn"><fecter.Form  method="post" onSubmit={logOut} action="/logout">
    <button type="submit">LogOut</button>
    </fecter.Form></div>
</div> 




</div>
    )
}