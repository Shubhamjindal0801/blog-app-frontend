import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from '../Blogs/BlogCard';
import { toast } from 'react-toastify';
import Loader from '../Loader/index'

function Homepage() {

    const userData = JSON.parse(localStorage.getItem('user'))
    const [blogs, setBlogs] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://blog-app-backend-9ut8.onrender.com/user/blog/homepageblogs/${userData.userId}`)
            .then((res) => {
                setIsLoading(false)
                setBlogs(res.data.data)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }, [userData.userId])

    return (
        <div className='mt-3 ms-4'>
            <h2 className='text-center mt-5'>Homepage of your Blog App</h2>
            {
                isLoading ?
                    <Loader />
                    :
                    <div>
                        {
                            blogs ? blogs.map((blog) =>
                                <BlogCard props={blog} buttons={false} />
                            )
                                :
                                <>Nothing to showcase</>
                        }
                    </div>
            }
        </div>
    )
}

export default Homepage
