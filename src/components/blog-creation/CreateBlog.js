import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { toast} from 'react-toastify';

function CreateBlog() {
  const [title, setTitle] = useState();
  const [textBody, setTextBody] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = (JSON.parse(localStorage.getItem('user')).userId).toString()
    console.log(userId)
    const blogObj = {
      title,
      textBody,
      userId
    };
    await Axios.post(`http://localhost:3004/user/blog/create-blog`,blogObj)
      .then((res) => {
        toast.success(res.data.message)
        setTimeout(()=>{
          window.location.href = '/user/myblogs'
        },2000)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        console.log(err)
      });
  };
  return (
    <div>
      <Form className="register_form m-5 border border-dark p-3 rounded" onSubmit={handleSubmit}>
        <h1 className="mb-5">Create a blog</h1>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="textBody">
          <Form.Label>Text Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text body"
            onChange={(e) => setTextBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create Blog</Button>
      </Form>
    </div>
  );
}

export default CreateBlog;
