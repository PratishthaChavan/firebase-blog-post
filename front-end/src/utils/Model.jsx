import React from 'react'

const Model = ({children}) => {
  return (
   <>
    <div className='bg-white/50 fixed inset-0 z-0'>
        {children}
    </div>
   </>
  )
}

export default Model;