import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "../../context/context";
import { Nav } from "../../data";
import Auth from "./Auth/Auth";
const DemoHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const { authModel, setAuthModel } = useBlog();
  useEffect(() => {
    const scrollme = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollme);
  }, []);
  return (
    <header
      className={`border-b border-black sticky top-0 z-50 ${
        isActive ? "bg-violet-600 shadow-md" : "bg-violet-400"
      } transition-colors duration-300`}
    >
      <div className="size h-[50px] md:h-[70px] flex items-center justify-between ">
        <Link to="/">
  
  <button
    className="hidden sm:block button  px-2 py-1 text-sm md:text-2xl"
    data-text="Awesome"
  >
    <span className="text-sm md:text-2xl">&nbsp;BAT&nbsp;</span>
    <span aria-hidden="true" className="hover-text">
      &nbsp;BAT&nbsp;
    </span>
  </button>

 
  <div className="block sm:hidden">
    <button className="font-bold text-green-400 text-xl">BAT</button>
  </div>
</Link>

        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5">
            {Nav.map((link, i) => (
              <Link key={i} to={link.path}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="relative"></div>
          <Auth modal={authModel} setModal={setAuthModel} />
          <button
            onClick={() => setAuthModel(true)}
            className={`bg-black text-white md:px-3 md:py-2 px-3  py-1 text-sm font-medium rounded-md md:rounded-full
               active:scale-95 transitioen-all duration-75
                ${isActive ? "bg-blue-600" : "bg-black"}`}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
