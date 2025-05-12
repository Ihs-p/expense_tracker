

import React from 'react'
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi'

const Navbar = ({ openSideMenu, setOpenSideMenu }) => {
  return (
    <div className='flex items-center gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
      <button
        className='block lg:hidden text-black'
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
    </div>
  )
}

export default Navbar
