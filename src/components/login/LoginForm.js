import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react'
// import loginUser from '../../actions/UserLoginAction'
import Axios from 'axios'
import { toast } from 'react-toastify'
import './LoginForm.css'

function LoginForm() {

    const [isPassVisible, setIsPassVisible] = useState(false)

    const [userDetails, setUserDetails] = useState({
        loginId: '',
        password: ''
    })


    useEffect(() => {
        if (localStorage.getItem("user")) {
            window.location.href = '/user/blog/homepage'
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //await loginUser(userDetails)
        await Axios.post(`http://localhost:3004/user/login`, userDetails)
            .then((res) => {
                toast.success(res.data.message)
                localStorage.setItem('user', JSON.stringify(res.data.data))
                if (res.data.status === 200) {
                    setTimeout(() => {
                        window.location.href = "/user/blog/homepage";
                    }, 2000)
                }
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }
    const handleSignUp = () => {
        window.location.href = '/user/signup'
    }


    return (
        <Form className='signup-form' onSubmit={handleSubmit}>
            <h2 className='mb-5'>Login into your Blog App</h2>
            <Form.Group className='mb-3 col-form-label' controlId='name'>
                <Form.Label>Login through email</Form.Label>
                <Form.Control
                    type='email'
                    required
                    placeholder='abc@example'
                    value={userDetails.loginId}
                    onChange={(e) => { setUserDetails({ ...userDetails, loginId: e.target.value }) }}
                />
            </Form.Group>
            <Form.Group className='mb-3 col-form-label' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type={isPassVisible ? 'text' : 'password'}
                    required
                    placeholder={isPassVisible ? 'password' : '********'}
                    value={userDetails.password}
                    onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }}
                />
                <div className='eye-icon'>
                    {
                        isPassVisible
                            ? <span class="material-symbols-outlined eye" onClick={() => setIsPassVisible(!isPassVisible)}>visibility</span>
                            : <span class="material-symbols-outlined eye" onClick={() => setIsPassVisible(!isPassVisible)}>visibility_off</span>
                    }
                </div>
            </Form.Group>

            <Button className='btn btn-primary' type='submit'>Login</Button>
            <div className='mt-3'>
                <p className='mb-1'>Don't have an account?</p>
                <Button className='btn btn-info' onClick={handleSignUp}>Sign Up</Button>
            </div>
        </Form>
    )
}

export default LoginForm