import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'

interface Trail {
    id: number;
    name: string;
    description: string;
    elevation: string;
    highestPoint: string;
    imageUrl: string;
    length: string;
    link: string;
    location: string;
}

const TrailCard = ({ trail }: { trail: Trail }) => {
  return (
    <div className=" bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-xs">
      <div className="relative">
        <img 
          src={trail.imageUrl} 
          alt={trail.name} 
          className="w-full h-40 object-cover" 
        />
        <div className="absolute bottom-0 left-0 bg-emerald-600 text-white px-2 py-1 text-xs rounded-tr-lg">
          {trail.length}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-emerald-700 mb-1 truncate">{trail.name}</h3>
        <p className="text-gray-600 text-sm mb-2 ">{trail.description}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="text-xs truncate">{trail.location}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Elev: {trail.elevation}
          </span>
          <Link 
            to={`/trails/${trail.id}`} 
            className="inline-flex items-center bg-emerald-600 text-white text-xs px-3 py-1 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Details
            <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TrailCard