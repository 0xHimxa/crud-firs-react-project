import { Outlet, redirect, useLoaderData } from "react-router";
import { getSession } from "~/config/session";
import type { Route } from "../+types/root";
import Navbar from "~/component/navbar";


export async function loader({request}:Route.LoaderArgs) {
  
    const cookie = request.headers.get('Cookie')
    const session = await getSession(cookie)
    const userToken = session.get('userToken')
    


    if(userToken){
        redirect('/')
        return { nav:true}
        
    }
   
    return redirect('/login')


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
        <p style={{backgroundColor:'red'}}>hhh
        ggrrrrrgg</p>
        <Outlet/>
        </>
    )
}