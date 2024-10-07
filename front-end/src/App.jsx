import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./components/home/home";
import Demo from "./components/demo/demo";
import HomeHeader from "./components/home/homeHeader";
import DemoHeader from "./components/demo/demoHeader";
import { Navigate } from "react-router-dom";
import { useBlog } from "./context/context";
import Write from "./components/home/write/Write";
import Profile from "./components/home/profile/profile";
import SinglePost from "./components/common/posts/singlePost";
import EditPost from "./components/common/posts/action/EditPost";
import Filter from "./components/demo/filter";
import Chatrooms from "./chatroom/Chatrooms";
import Chats from "./chatroom/chats";
import Chatroom from "./chatroom/Chatrooms";
import { Login } from "./login/login";



function App() {
    


  const { currentUser } = useBlog();
  return (
    <>
    {currentUser? <HomeHeader/> : <DemoHeader/>}
        <Routes>
         {currentUser && <Route path="/" element={<Home/>} />}
         {!currentUser && <Route path="/demo" element={<Demo/>} />}
         <Route path="*" element={<Navigate to={!currentUser ? "/demo" : "/"} />}></Route>
         <Route path="/profile/:userId" element={<Profile/>}></Route>
         <Route path="/write" element={<Write/>}></Route>
         <Route path="/post/:postId" element={<SinglePost/>}></Route>
         <Route path="/editpost/:postId" element={<EditPost/>}></Route>
         <Route path="/filter/:tag" element={<Filter/>}></Route>
         <Route path="/chatrooms" element={<Chatrooms/>}></Route>
         <Route path="/chatroom/:chatId" element={<Chatroom/>}></Route>
         <Route path="/chat" element={<Chats/>}></Route>
         <Route path="/login" element={<Login />}></Route>
        </Routes>
    </>
  )
}

export default App
