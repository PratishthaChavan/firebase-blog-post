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
        </Routes>
    </>
  )
}

export default App
