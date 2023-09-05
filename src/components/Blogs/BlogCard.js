import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Form } from 'react-bootstrap';
import Axios from 'axios'
import React, { useState } from 'react'
import './blogs.css'
import { toast } from 'react-toastify';

function BlogCard({ props, buttons }) {
    const [showModal, setShowModal] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user'))
    const [title, setTitle] = useState(props.title)
    const [textBody, setTextBody] = useState(props.textBody)

    const handleDelete = () => {
        const deleteRes = window.confirm('Do you really want to delete this?')
        if (deleteRes === true) {
            Axios.delete(`http://localhost:3004/user/blog/delete-blog/${props._id}`)
                .then((res) => {
                    //alert(res.data.message)
                    toast.success(res.data.message)
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                })
                .catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(!showModal);

    const handleEdit = () => {
        handleClose()
        const newBlog = {
            blogId: props._id,
            title: title,
            textBody: textBody,
            userId: props.userId
        }
        Axios.put(`http://localhost:3004/user/blog/edit-blog`, newBlog)
            .then((res) => {
                toast.success(res.data.message)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    return (
        <Card className='m-5'>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                {/* <Card.Text>By {props.name}</Card.Text> */}
                <Card.Text>{props.textBody}</Card.Text>
                <Card.Text className='card-username'>By: {props.username}</Card.Text>
                {
                    buttons ?
                        <>
                            <Button variant='info' onClick={handleShow} >Edit Blog</Button>
                            <Button variant='danger' className='ms-4' onClick={handleDelete}>Delete Blog</Button>
                        </>
                        :
                        <></>
                }

                {
                    showModal ?
                        <>
                            <Form className='m-5' show={showModal} onHide={handleClose}>
                                <Form.Group controlId="title">
                                    <Form.Label>Edit Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="body">
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={textBody}
                                        onChange={(e) => setTextBody(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                            <div className='m-5'>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button className='ms-4' variant="primary" onClick={handleEdit}>
                                    Save Changes
                                </Button>
                            </div>
                        </>
                        : <></>
                }

            </Card.Body>
        </Card>
    )
}

export default BlogCard