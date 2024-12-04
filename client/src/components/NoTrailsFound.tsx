import { MapPin, Search } from 'lucide-react'

const NoTrailsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto text-center">
      <div className="bg-emerald-100 p-4 rounded-full mb-4">
        <MapPin className="w-12 h-12 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-bold text-emerald-800 mb-2">No Trails Found</h2>
      <p className="text-stone-600 mb-6">Sorry, we couldn't find any trails that match your search.</p>
      <div className="space-y-4">
        <p className="text-stone-700 font-medium">Try adjusting your search:</p>
        <ul className="text-left text-stone-600 space-y-2">
          <li className="flex items-center">
            <Search className="w-4 h-4 mr-2 text-emerald-600" />
            Use more general keywords
          </li>
          <li className="flex items-center">
            <Search className="w-4 h-4 mr-2 text-emerald-600" />
            Check for spelling errors
          </li>
          <li className="flex items-center">
            <Search className="w-4 h-4 mr-2 text-emerald-600" />
            Try searching for a nearby location
          </li>
        </ul>
      </div>
      <button 
        className="mt-8 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        onClick={() => window.location.href = '/trails'}
      >
        Explore All Trails
      </button>
    </div>
  )
}

export default NoTrailsFound