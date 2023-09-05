
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlog';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const userData = localStorage.getItem('user')
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {
            userData ?
              <Route path='/' element={<Homepage />} />
              :
              <Route path='/' element={<Signup />} />
          }
          <Route path='/user/blog/homepage' element={<Homepage />} />
          <Route path='/user/signup' element={<Signup />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/blog/create-blog' element={<CreateBlog />} />
          <Route path='/user/myblogs' element={<MyBlogs />} />
          <Route path='/user/allUser' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
