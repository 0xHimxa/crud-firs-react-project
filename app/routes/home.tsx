import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import { PiBoxingGloveBold } from 'react-icons/pi';
import { PiBoxingGloveFill } from 'react-icons/pi';
import type { Route } from "./+types/home";
import { getSession } from "~/config/session";






export default function Home (){

    const [like,setLiked] = useState(false)


    return(

        <div style={{paddingLeft:'20px'}}>

<div className="post-box">
    <div className="user-header">
        <img src='/t.jpg' className="user-img"/>

         <p className="user-name1">Himxa</p>
   <p className="user-name2">@0xhim_</p>
  
   
    </div>

    <div className="post-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. At quas tenetur veniam asperiores ducimus accusantium. Voluptas eligendi quae dolorem minima?</div>

<div className="like-action" >

     <button onClick={()=> setLiked((prev)=> !prev)}>{like? <PiBoxingGloveFill className="like-icon"/>:   <PiBoxingGloveBold className="like-icon"/>}</button>
    
     
      <span>120</span>
      </div>

</div>





        </div>
    )
}