import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the sign-in logic
    console.log('Sign-in attempted with:', { email, password })
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="font-bold text-emerald-800 text-2xl mb-6 text-center">Sign in to Washington Trails</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">

            <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2 ">
              Email
            </label>

            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>



          <div className="mb-6">

            <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border rounded-md border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required

              />


              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInForm