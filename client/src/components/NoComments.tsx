import { MessageCircle } from 'lucide-react'


export function NoComments() {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <MessageCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No comments yet</h2>
        <p className="text-gray-500 text-center">Be the first to share your thoughts!</p>
      </div>
    )
  }
  
  