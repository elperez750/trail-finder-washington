import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Trail } from '../types/trail';


const TrailCard = ({ trail }: { trail: Trail }) => {
const navigate = useNavigate();

  
const fetchIndividualTrail = async () => {

  try {
    navigate(`/trail/${trail._id}`);
   
  } catch (err) {
    console.error("Error fetching individual trail:", err);
  } finally {
    console.log("Trail fetched");}
}


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-xs">
      {/* Image Section */}
      <div className="relative">
        {!trail.imageUrl ? (
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
            }
            alt={trail.name}
            className="w-full h-40 object-cover"
          />
        ) : (
          <img
            src={trail.imageUrl}
            alt={trail.name}
            className="w-full h-40 object-cover"
          />
        )}

        {/* Trail Length */}

        {trail.length ? (<div className="absolute bottom-0 left-0 bg-emerald-600 text-white px-2 py-1 text-xs rounded-tr-lg">
          {trail.length}
        </div> ) : null}


      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Trail Name */}
        <h3 className="text-lg font-semibold text-emerald-700 mb-1 truncate">
          {trail.name}
        </h3>

        {/* Trail Description */}
        <p className="text-gray-600 text-sm mb-2 truncate">
          {trail.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="text-xs truncate">{trail.location}</span>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center">
          {trail.elevation ? (
          <span className="text-xs text-gray-500">Elev: {trail.elevation}</span>
          ) : <span className="text-xs text-gray-500">Elev: Unknown</span>}

          <Link
          
            to={`/trail/${trail._id}`}
            onClick={() => fetchIndividualTrail()}
            className="inline-flex items-center bg-emerald-600 text-white text-xs px-3 py-1 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Details
            <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrailCard;
