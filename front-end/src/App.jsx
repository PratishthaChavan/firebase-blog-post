import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./components/home/home";
import Demo from "./components/demo/demo";
import HomeHeader from "./components/home/homeHeader";
import DemoHeader from "./components/demo/demoHeader";
function App() {
 
const auth = false;
  return (
    <>
    {auth ? <HomeHeader/> : <DemoHeader/>}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/demo" element={<Demo/>} />
        </Routes>
    </>
  )
}

export default App
