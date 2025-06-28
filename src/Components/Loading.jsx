import React from 'react'

import miniloading from "../../public/loadingMini.gif"

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-white'>
        <img src={miniloading} alt=""  className=' flex justify-center items-center size-[200px] m-auto '/>
    </div>
  )
}

export default Loading