import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import BlogCard from './BlogCard'
import Loader from '../Loader'

function MyBlog() {
    // const [page, setPage] = useState(1)
    const [myBlogs, setMyBlogs] = useState()
    const userData = JSON.parse(localStorage.getItem('user'))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Axios.get(`http://localhost:3004/user/blog/my-blogs/${userData.userId}`)
            .then((res) => {
                setIsLoading(false)
                setMyBlogs(res.data.data)
            })
    }, [userData.userId])

    return (
        <div>
            <h1 className='m-5'>MY Blogs</h1>
            {
                isLoading ?
                    <Loader />
                    :
                    <div>
                        {myBlogs ?
                            <div>

                                {myBlogs.map((blog) =>
                                    <BlogCard props={blog} buttons={true} />
                                )}
                            </div> :
                            <><h1 className='m-5'>No Blogs were there</h1></>
                        }
                    </div>
            }
        </div>
    )
}

export default MyBlog