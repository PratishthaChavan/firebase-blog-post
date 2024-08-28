import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../../data';
import Auth from './Auth/Auth';
const DemoHeader = () => {
    const [isActive,setIsActive] = useState(false);
    const [modal,setModal] = useState(false); 
   useEffect(() => {
    const scrollme = () => {
        window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    }
    window.addEventListener("scroll",scrollme);
//'border-b border-black sticky top-0 z-50'
   },[])
  return (
    <header
    className={`border-b border-black sticky top-0 z-50' ${
      isActive ? 'bg-violet-600 shadow-md' : 'bg-violet-400'
    } transition-colors duration-300`}
  >

        <div className='size h-[70px] flex items-center justify-between'>
           <Link to="/">
             <h1>BlogSite</h1>
           </Link>
            <div className='flex items-center gap-5'>
               <div className='hidden text-sm sm:flex items-center gap-5'>
                   {Nav.map((link, i) => (
                    <Link key={i} to={link.path}>
                        {link.title}
                    </Link>
                ))}
               </div>
               <div className='relative'>
                <button onClick={() => setModal(true)} className='hidden text-sm sm:flex items-center gap-5' >sign up</button>
               
               </div>
               <Auth modal={modal} setModal={setModal}/>
               <button onClick={() => setModal(true)} className={`bg-black text-white px-3 py-2 font-medium rounded-full
                ${isActive ? 'bg-blue-600' : 'bg-black' }`}>Get started</button>
            </div>
    
        </div>
   
    </header>
  )
}

export default DemoHeader;