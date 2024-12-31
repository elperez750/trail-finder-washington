import React from 'react'
import { Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';


const SignInToView = () => {
  return (
    <div className='flex flex-col p-4 rounded-lg bg-white max-w-md'>
        <div className="rounded-full bg-emerald-100 w-12 h-12 flex items-center justify-center m-auto">
        <Lock size={24} className='m-auto text-emerald-600' />
        </div>


        <div className="text-center mt-4">
            <h1 className='text-2xl text-emerald-800 font-bold'>Sign in to view comments</h1>
            <p className='mt-4'>Join the conversation! Sign in to view and post comments about this trail.</p>
        </div>


        <div className="flex justify-center mt-4">
            <Link to='/login' className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">

                <LogIn size={24} />
                <span>Sign In</span>
            </Link>

            

            <Link to="/register" className="bg-stone-100 text-stone-600 px-4 py-2 rounded-lg flex items-center space-x-2 ml-4">
                <span>Sign Up</span>
            </Link>
        </div>
      
    </div>
  )
}

export default SignInToView
