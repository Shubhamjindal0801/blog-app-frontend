import axios from "axios";
import { Button, Card } from "react-bootstrap";
import './Users.css'
import { toast } from "react-toastify";

function UsersCard({ props }) {
    const userData = JSON.parse(localStorage.getItem('user'))

    const handleFollow = (followingUserId) => {
        const followObj = { followingUserId }
        axios.post(`http://localhost:3004/user/follow-user/${userData.userId}`, followObj)
            .then((res) => {
                toast.success(`You started following ${props.name}`)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    const handleUnfollow = (followingUserId) => {
        const followObj = { followingUserId }
        axios.post(`http://localhost:3004/user/unfollow-user/${userData.userId}`, followObj)
            .then((res) => {
                toast.success(`You stopped following ${props.name}`)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    return (
        <Card className="m-2 mb-5 mt-4" style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>Name: {props.name}</Card.Title>
                <Card.Text>Username: {props.username}</Card.Text>
                <Card.Text>Email: {props.email}</Card.Text>
                {
                    props.follow === true
                        ?
                        <Button className="follow-btn" onClick={() => handleUnfollow(props._id)} variant="danger">Unfollow</Button>
                        :
                        <Button className="follow-btn" onClick={() => handleFollow(props._id)} variant="primary">Follow</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default UsersCard