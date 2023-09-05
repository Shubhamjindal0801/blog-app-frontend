import React, { useEffect } from 'react'
import Header from '../components/header/Header'
import UsersComponent from '../components/users/UsersComponent'

function Users() {
    
    useEffect(()=>{
        document.title = 'Users - Blog App'
    },[])

    return (
        <div>
            <Header />
            <UsersComponent />
        </div>
    )
}

export default Users