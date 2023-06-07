import React from 'react'
import 'app/globals.css'

const PageTitle = ({number, title, className}) => {
console.log();

  return (
    <div className={`flex gap-4 justify-center mt-4  ${className} px-10 lg:justify-start`}>
      <p className='font-bold heading_5 opacity-25'>{number}</p><p className='heading_5 text-white'>{title}</p>
    </div>
  )
}

export default PageTitle