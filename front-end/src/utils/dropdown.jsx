import React from 'react'
import { useRef,useEffect } from 'react'

const Dropdown = ({children,size,showDrop,setShowDrop}) => {
    const dropRef = useRef();
    useEffect (() => {
        const clickOutside = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)){
                setShowDrop(false);
            }

        };
        window.addEventListener("mousedown",clickOutside);
        return () => window.addEventListener("mousedown",clickOutside);
    },[setShowDrop]);
  return (
    <>
    { showDrop &&
        (<div 
            ref={dropRef}
            className={`flex flex-col absolute right-0 top-[2rem] shadow bg-white ${size}`}>{children}</div>)
    }
    </>
  )
}

export default Dropdown