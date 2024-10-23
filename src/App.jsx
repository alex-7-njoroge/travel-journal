import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/login'
import { Link ,Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import GlobalPosts from './components/GlobalPosts'
import SingleGlobalPost from './components/SingleGlobalPost'
import Users from './components/Users'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import { useState } from 'react'
import PostForm from './components/PostForm'
function App() {
const [user,setUser]=useState({})
function assignUser(newUser){
  setUser(newUser)
  console.log(user)
}

// function
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm
        user={user} assignUser = {assignUser} />} />
        <Route path="/updateprofile" element={<UserProfile />} /> 
        <Route path="/home" element={<GlobalPosts />} />
        <Route path="/post/:id" element={<SingleGlobalPost />} />
        <Route path="/users" element={<Users />} />
         <Route path="/profile/:id" element={<Profile />} />
         <Route path="/userprofile" element={<UserProfile user={user} assignUser = {assignUser}/>} />
         <Route path="/addpost" element={<PostForm user={user} assignUser = {assignUser}/>} />
      </Routes>

    </div>
  )
}

export default App
