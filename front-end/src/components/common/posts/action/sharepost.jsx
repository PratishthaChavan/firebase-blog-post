import React from 'react'
import Dropdown from '../../../../utils/dropdown'
import { useState } from 'react'
import { CiShare1 } from 'react-icons/ci';
import { MdContentCopy, MdOutlineMarkEmailRead   } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { SiReddit } from "react-icons/si";
import { GrPinterest } from "react-icons/gr";

import {
    EmailShareButton,
    LinkedinShareButton,
    OKShareButton,
    RedditShareButton,
    PinterestShareButton,
    
    TelegramShareButton,
    WhatsappShareButton,
    
  } from "react-share";
const Sharepost = () => {
    const [showDrop,setShowDrop] = useState(true);
  return (
    <>
    <div className='relative'>
    <button onClick={() => setShowDrop(!showDrop)}> 
        <CiShare1 className='text-2xl' /> 
    </button>
    
        <Dropdown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
           <Button click={""} title='Copy link' icon={<MdContentCopy />}></Button>
           <Button click={""} title='share on Email' icon={<MdOutlineMarkEmailRead />}></Button>
           <Button click={""} title='share on Pinterest' icon={<GrPinterest />}></Button>
           <Button click={""} title='share on Whatapp' icon={<FaWhatsapp />}></Button>
           <Button click={""} title='share on Reddit' icon={<SiReddit />}></Button>
        </Dropdown>
    
    </div>
</>
  )
}

export default Sharepost
const Button = ({click,icon,title}) => {
    return(
        <button className='p-2 hover:bg-gray-500 hover:text-black/80 w-full 
        text-sm text-left flex items-center cursor-pointer'>
   <span className='text-[1.2rem]'>{icon}</span> {title}
        </button>
    )
}