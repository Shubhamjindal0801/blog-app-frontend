import React, { useEffect } from 'react'
import Header from '../components/header/Header'
import BlogComponent from '../components/Blogs/BlogComponent'
function MyBlog() {

    useEffect(()=>{
        document.title = 'My Blogs - Blog App'
    },[])

    return (
        <div>
            <Header/>
            <BlogComponent />
        </div>
    )
}

export default MyBlog
