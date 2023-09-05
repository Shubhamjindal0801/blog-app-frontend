import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UsersCard from './UsersCard'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import Loader from '../Loader'

function Users() {
    const [allUsers, setAllUsers] = useState()
    const userData = JSON.parse(localStorage.getItem('user'))
    const [userAll, setUserAll] = useState(false)
    const [buttonText, setButtonText] = useState('All Users')
    const [isLoading, setIsLoading] = useState(true)
    const [apiCarshes, setApiCrashes] = useState(false)


    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://blog-app-backend-9ut8.onrender.com/user/allusers/${userData.userId}`)
            .then((res1) => {
                axios.get(`https://blog-app-backend-9ut8.onrender.com/user/following-list/${userData.userId}`)
                    .then((res2) => {
                        let followingMap = new Map()

                        res2.data.data.forEach((user) => {
                            followingMap.set(user.username, true)
                        })

                        let allUseDetails = []

                        res1.data.data.forEach((user) => {
                            if (followingMap.get(user.username)) {
                                let userObj = {
                                    _id: user._id,
                                    username: user.username,
                                    name: user.name,
                                    email: user.email,
                                    follow: true
                                }
                                allUseDetails.push(userObj)
                            } else {
                                let userObj = {
                                    _id: user._id,
                                    username: user.username,
                                    name: user.name,
                                    email: user.email,
                                    follow: false
                                }
                                allUseDetails.push(userObj)
                            }
                        })
                        setIsLoading(false)
                        setApiCrashes(false)
                        setAllUsers(allUseDetails)
                    }).catch((err) => {
                        setIsLoading(false)
                        setApiCrashes(true)
                        toast.error(err.response.data.message)
                    })
            }).catch((err) => {
                setIsLoading(false)
                setApiCrashes(true)
                toast.error(err.response.data.message)
            })
        setButtonText('All Users')
        setUserAll(false)
    }, [userAll, userData.userId])


    const getFollowingList = async () => {
        setIsLoading(true)
        await axios.get(`https://blog-app-backend-9ut8.onrender.com/user/following-list/${userData.userId}`)
            .then((res) => {
                setIsLoading(false)
                setApiCrashes(false)
                setAllUsers(res.data.data)
            }).catch((err) => {
                setApiCrashes(true)
                setIsLoading(false)
                toast.error(err.response.data.message)
            })
        setButtonText('Following List')
    }

    const getFollowerList = async () => {
        setIsLoading(true)
        await axios.get(`https://blog-app-backend-9ut8.onrender.com/user/follower-list/${userData.userId}`)
            .then((res) => {
                setIsLoading(false)
                setApiCrashes(false)
                setAllUsers(res.data.data)
            }).catch((err) => {
                setApiCrashes(true)
                setIsLoading(false)
                toast.error(err.response.data.message)
            })
        setButtonText('Follower List')
    }

    const getAllUsers = () => {
        setUserAll(true)
    }

    return (
        <>
            <h1 className='m-3 d-flex justify-content-center mt-5'>{buttonText}</h1>
            <div className='ms-4'>
                <Button onClick={getAllUsers}>All</Button>
                <Button className='ms-4' onClick={getFollowingList}>Following</Button>
                <Button className='ms-4' onClick={getFollowerList}>Followers</Button>
            </div>
            {
                isLoading ?
                    <Loader />
                    :
                    <div>
                        {
                            apiCarshes ?
                                <h3>Something went wrong! Please try after some time</h3>
                                :
                                <div className='m-3' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
                                    {
                                        allUsers.length > 0 ? allUsers.map((user) => <UsersCard props={user} />) : <h3 className='m-5'>No User Now</h3>
                                    }
                                </div>
                        }
                    </div>
            }
        </>
    )
}

export default Users
