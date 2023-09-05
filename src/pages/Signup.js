import React, { useEffect } from 'react'
import InputForm from '../components/register/InputForm'

function Signup() {

    useEffect(()=>{
        document.title = 'Signup - Register to blog app- Blog App'
    },[])

    return (
        <div>
            <InputForm />
        </div>
    )
}

export default Signup
