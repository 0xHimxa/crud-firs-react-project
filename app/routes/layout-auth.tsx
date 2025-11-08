import { Outlet, redirect, useLoaderData } from "react-router";
import { getSession } from "~/config/session";
import type { Route } from "../+types/root";
import Navbar from "~/component/navbar";


export async function loader({request}:Route.LoaderArgs) {
  
    const cookie = request.headers.get('Cookie')
    const session = await getSession(cookie)
    const userToken = session.get('userToken')
    


if(!userToken) return redirect('/login')


    
      return{nav: true,userToken}
        
 
   
   


}




export async function action(){
console.log('in here')


}

interface LoaderData{
    nav: boolean
    userToken?: string | null
}


export default function LayoutAuthCheck(){
    const loaderData = useLoaderData() as LoaderData;
    console.log(loaderData.nav)
     const navrender = loaderData

    return(

        <>
        <Navbar show={loaderData.nav}/>
      
        <Outlet/>
        </>
    )
}