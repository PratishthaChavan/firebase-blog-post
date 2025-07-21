import React from 'react'

const Banner = () => {
  return (
    <div className='bg-yellow-500 border border-black'>
        <div className='size py-[5rem] flex flex-col items-start gap-[1rem]'>
             <h1 className='font-title text-[3rem] sm:text-[7rem] md:text-[6rem] font-normal'>Stay curious</h1>
             
             <p className='text-green-200 w-full md:w-[30rem] text-[1.3rem] md:text-[1.5rem] '>
             Every story matters, and here, every voice is heard. Discover, share, and connect with the stories that inspire you.
             </p>

             
             <button className='btn bg-black rounded-full text-green-400 !px-6 !mt-[2.5rem] !text-[1.2rem]'>Start Reading</button>

        </div>
  
        
    </div>
  )
}

export default Banner