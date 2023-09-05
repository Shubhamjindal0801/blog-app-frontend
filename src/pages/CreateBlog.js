import React, { useEffect } from 'react'
import CreationBlog from '../components/blog-creation/CreateBlog'
import Header from '../components/header/Header'

function CreateBlog() {

    useEffect(()=>{
        document.title = 'Create Your Own Blog - Blog App'
    },[])

    return (
        <div>
            <Header />
            <CreationBlog />
        </div>

    )
}

export default CreateBlog
