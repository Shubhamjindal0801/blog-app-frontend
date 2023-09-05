import React from 'react'
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { toast } from 'react-toastify';
import './header.css'

function Header() {
    const userData = JSON.parse(localStorage.getItem('user'))

    const handleLogout = async () => {
        // await userlogout()
        axios.post(`https://blog-app-backend-9ut8.onrender.com/user/logout`).then((res) => {
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
        localStorage.removeItem('user')
        setTimeout(() => {
            window.location.href = '/user/login'
        }, 1000)

    }
    const handleCreateBlog = () => {
        window.location.href = '/user/blog/create-blog'
    }
    const handleMyBlog = () => {
        window.location.href = '/user/myblogs'
    }
    const handleUsers = () => {
        window.location.href = '/user/allUser'
    }
    const handleHomepage = () => {
        window.location.href = '/user/blog/homepage'
    }

    return (
        <div className='header-component align-items-center p-4 d-flex justify-content-between'>
            <h2 className='d-flex justify-content-center mt-3'>Welcome 🙂 <i>{userData.name.toUpperCase()}</i></h2>
            <div className=' d-flex gap-3 justify-content-center '>
                <Button onClick={handleHomepage}>Home</Button>
                <Button onClick={handleCreateBlog}>Create your blog</Button>
                <Button onClick={handleMyBlog}>My Blogs</Button>
                <Button onClick={handleUsers}>Users</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Header
