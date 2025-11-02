import { NavLink } from "react-router";
import '../app.css'

export default function Navbar(){



    return(
<div className="nav-box">
    <div className="nav-title">Shit-Posting Social</div>
    <div className="nav-link">
        <NavLink to='/'  className='links'>Home</NavLink>
        <NavLink to='/login' className='links login'>Login</NavLink>
</div></div>
    )
}