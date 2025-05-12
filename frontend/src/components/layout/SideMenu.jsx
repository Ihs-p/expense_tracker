import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import {  useNavigate } from 'react-router-dom'
import { SIDE_MENU_DATA } from '../../utils/data'
import { useUserAuth } from '../../hooks/useUserAuth'
import CharAvatar from '../Cards/CharAvatar'

const SideMenu = ({activeMenu}) => {


const {user, clearUser} = useContext(UserContext)

const navigate  = useNavigate()

const handleClick = (route)=>{
  if(route == "/logout"){
    handleLogout();
    return;
  }
  navigate(route)
}

const handleLogout = ()=>{
  localStorage.removeItem('token')
  clearUser()
  navigate('/login')
}

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50  '>
        
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
          {
            user?.profileImageUrl ? (
              <img
              src={user?.profileImageUrl || ''}
              alt='profile-image'
              className='w-20 h-20 bg-slate-400 rounded-full '
              />
            ):(
              <CharAvatar 
              fullName = {user?.fullName}
              width = "w-20"
              height = "h-20"
              style = "text-2xl"  
              />
            )
          }

          <h5 className='text-gray-950 font-medium leading-6 '>{user?.fullName || "" }</h5>

        </div>

        {SIDE_MENU_DATA.map((item,index)=>(
    <button
    key={item.label}
    onClick={() => handleClick(item.path)}
    className={`w-full flex items-center gap-4 text-[15px] py-3 px-4 rounded-lg mb-2 transition-all 
      ${activeMenu === item.label ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
  >
    <item.icon className={`text-xl ${activeMenu === item.label ? "text-white" : "text-gray-600"}`} />
    <span className="flex-1 text-left">{item.label}</span>
  </button>
        ))}
    </div>
  )
}

export default SideMenu