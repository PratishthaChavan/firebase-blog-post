import React from 'react'
import Dropdown from '../../../../utils/dropdown'
import { useState } from 'react'
import { CiShare1 } from 'react-icons/ci';
import { MdContentCopy, MdOutlineMarkEmailRead   } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { SiReddit } from "react-icons/si";
import { GrPinterest } from "react-icons/gr";
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa6';
import {
    EmailShareButton,
    LinkedinShareButton,
    OKShareButton,
    RedditShareButton,
    PinterestShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    
  } from "react-share";
const Sharepost = () => {
    const [showDrop,setShowDrop] = useState(false);

    const path = window.location.href;
    const copyLink = async() => {
     try {
      await navigator.clipboard.writeText(path);
      alert("The link is copied successfully");
      setShowDrop(false)
     } catch (error) {
      console.log("Internal server error");
     }
    }
  return (
    <>
    <div className='relative'>
    <button onClick={() => setShowDrop(!showDrop)}> 
        <CiShare1 className='text-2xl' /> 
    </button>
    
        <Dropdown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
           <Button click={copyLink} title='Copy link' icon={<MdContentCopy />}></Button>
          <EmailShareButton>
             <Button  title='share on Email' icon={<MdOutlineMarkEmailRead />}></Button>
             </EmailShareButton>
             <TwitterShareButton url={path}>
                    <Button title='Share on Twitter' icon={<FaTwitter />} />
                </TwitterShareButton>
                <LinkedinShareButton url={path}>
                    <Button title='Share on LinkedIn' icon={<FaLinkedin />} />
                </LinkedinShareButton>
             
           <Button title='share on Pinterest' icon={<GrPinterest />}></Button>
           <WhatsappShareButton url={path}>
                    <Button title='Share on WhatsApp' icon={<FaWhatsapp />} />
          </WhatsappShareButton>
          <RedditShareButton url={path}>
                    <Button title='Share on Reddit' icon={<SiReddit />} />
          </RedditShareButton>
        </Dropdown>
    
    </div>
</>
  )
}

export default Sharepost
const Button = ({click,icon,title}) => {
    return(
        <button
        onClick={(click)}
         className='p-2 hover:bg-gray-500 hover:text-black/80 w-full 
        text-sm text-left flex items-center cursor-pointer'>
   <span className='text-[1.2rem]'>{icon}</span> {title}
        </button>
    )
}