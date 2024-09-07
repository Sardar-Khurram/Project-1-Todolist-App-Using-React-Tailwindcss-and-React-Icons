import React from 'react'

const Navbar = () => {
  return (
      <nav className="flex justify-between text-white bg-violet-800 py-2">
      <div className="logo">
        <span  className="logo font-bold text-xl mx-9">Tasker</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold hover:underline transition-all duration-200'>Home</li>
        <li className='cursor-pointer hover:font-bold hover:underline transition-all duration-200'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar