import { createCookieSessionStorage } from "react-router";



const sessionStorage = createCookieSessionStorage({
    cookie:{
        name: 'accessToken',
        httpOnly: true,
        path: '/',
        sameSite:'lax',
        secure: process.env.node === 'production',
        secrets:['1.3dfc#%gf@!h*s']
    },
})


export const {getSession,commitSession,destroySession} = sessionStorage