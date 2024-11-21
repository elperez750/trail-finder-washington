import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { Leaf, Mountain, TreePine } from 'lucide-react'

const RegisterPage: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-900">
      <div className="absolute inset-0 pointer-events-none">
        <Leaf className="fixed top-[5%] left-[10%] text-white opacity-10" size={80} />
        <Leaf className="fixed bottom-[5%] right-[10%] text-white opacity-10 transform rotate-180" size={80} />
        <Mountain className="fixed bottom-0 left-0 text-white opacity-5" size={200} />
        <Mountain className="fixed top-0 right-0 text-white opacity-5 transform rotate-180" size={200} />
        <TreePine className="fixed top-1/4 left-[5%] text-white opacity-5" size={100} />
        <TreePine className="fixed bottom-1/4 right-[5%] text-white opacity-5" size={100} />
      </div>
      
      <div className="z-10 w-full max-w-md px-4">
        <SignUpForm />
      </div>
    </div>
  )
}

export default RegisterPage