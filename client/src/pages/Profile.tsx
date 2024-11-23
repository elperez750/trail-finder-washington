import { User, Mail, Edit } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
    const { user } = useAuth();


  return (
    <div className="min-h-screen bg-stone-100">
       <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
          <div className="bg-emerald-600 h-32"></div>
          <div className="px-6 py-8">
            <div className="flex justify-center -mt-16 mb-6">
              <span className="p-4 bg-emerald-500 rounded-full text-white">
                <User size={64} />
              </span>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{user? user.name: "no info found"}</h2>
            <div className="flex items-center justify-center text-gray-600 mb-6">
              <Mail className="w-5 h-5 mr-2" />
              <span>{user? user.email: "No info found"}</span>
            </div>
           
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
