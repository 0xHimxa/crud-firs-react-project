import { NavLink } from "react-router";
import '../app.css'
import { useState } from "react";

export default function Navbar(){

const [user,setUser] = useState(false)

    return(
<div className="nav-box">
    <div className="nav-title">Shit-Posting Social</div>
    <div className="nav-link">
        <NavLink to='/' className={({isActive})=> isActive? 'links login add-red': 'links login'}>Home</NavLink>
       
{user?        <NavLink to='/createpost' className={({isActive})=> isActive? 'links login add-red': 'links login'}>shit post</NavLink>
:         <NavLink to='/login' className={({isActive})=> isActive? 'links login add-red': 'links login'}>Login</NavLink>
 }
</div>


{/* <div className="current-user">

    <img src="../../../public/t.jpg" alt=""  style={{width: '10%'}}/>
<p>Himxa</p>
<div className="l-btn"><button>LogOut</button></div>
</div> */}




</div>
    )
}