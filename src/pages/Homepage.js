import React, { useEffect } from 'react'
import HomepageComponent from '../components/homepage/homepage'
import Header from '../components/header/Header'

function Homepage() {

    useEffect(()=>{
        document.title = 'Homepage - Blog App'
    },[])

    return (
        <div>
            <Header />
            <HomepageComponent />
        </div>
    )
}

export default Homepage
