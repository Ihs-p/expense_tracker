import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)

  const {updateUser} = useContext(UserContext)

  const navigate  = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!validateEmail(email)){
      setError("please enter a valid email address");
      return;
    }

    if(!password){
      setError("please enter password");
      return;
    }

    setError('')

    try{
      const response  = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password
      });
      const {token , user } = response.data;

      

      if(token){
    
        localStorage.setItem('token',token)
        updateUser(user)
        navigate('/dashboard')
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("something went wrong, please try again ")
        
      }
    }
  }

  return (
   <AuthLayout>
     <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center '>
      <h3  className='text-xl font-semibold text-black '>Welcome Back </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6 '>
        Please enter your details to login
        
      </p>

      <form onSubmit={handleSubmit}>

        <Input 
        value={email}
        onChange = {({ target }) => setEmail(target.value)}
        label = "Email address"
        placeholder  = "john@example.com"
        type = "text"
        />

<Input 
        value={password}
        onChange = {({ target }) => setPassword(target.value)}
        label = "Password"
        placeholder  = "Min 8 Characters"
        type = "password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5 '>{error}</p>}

        <button  className='btn-primary' type='submit'>Login</button>

        <p className=' text-[13px] text-slate-800 mt-3 '>Don't have an account? <Link className='font-medium text-primary underline ' to='/signup'>SignUp</Link></p>
       


      </form>
      
    </div>
   </AuthLayout>
  )
}

export default Login