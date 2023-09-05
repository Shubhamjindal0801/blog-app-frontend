import React, { useEffect } from 'react'
import LoginUser from '../components/login/LoginForm'

function Login() {

    useEffect(()=>{
        document.title = 'Login into your blog app - Blog App'
    },[])

    return (
        <LoginUser />
    )
}

export default Login
