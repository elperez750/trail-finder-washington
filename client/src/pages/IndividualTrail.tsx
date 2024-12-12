import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { MapPin, Mountain, AlertTriangle, ArrowLeft } from "lucide-react";

const IndividualTrailPage: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const trailDetails = location.state?.trailDetails;
  const name = location.state?.name;
  const image = location.state?.image;
  const length = location.state?.length;
  const elevationGain = location.state?.elevationGain;
  const location_name = location.state?.location_name;

  useEffect(() => {
    if (trailDetails) {
      setLoading(false);
    }
  }, [trailDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-stone-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!trailDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-100">
        <AlertTriangle className="w-16 h-16 text-emerald-500 mb-4" />
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          No Trail Data Available
        </h1>
        <p className="text-stone-600 mb-4">
          We couldn't find any information for this trail.
        </p>
        <Link
          to="/trails"
          className="text-emerald-600 hover:text-emerald-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Trails
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src={image}
                alt={name}
                className="w-full h-48 md:h-full object-cover object-center"
              />
            </div>
            <div className="p-6 md:w-2/3 md:p-8">
              <h1 className="text-3xl font-bold text-emerald-800 mb-2">
                {trailDetails.name}
              </h1>
              <div className="flex items-center text-stone-600 mb-4">
                <MapPin className="w-6 h-6 mr-2" />
                <span>{location_name}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mt-4">
                <div className="flex items-center">
                  <Mountain className="w-6 h-6 text-emerald-600 mr-2" />
                  <span className="text-sm font-semibold text-stone-800">
                    Difficulty: {trailDetails.difficulty}
                  </span>
                </div>
                <div className="text-stone-600 whitespace-nowrap text-sm">
                  Length: {length} • Elevation Gain: {elevationGain}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-6">
            {trailDetails.paragraphs?.map(
              (paragraph: string, index: number) => (
                <p key={index} className="text-stone-700 leading-relaxed">
                  {paragraph}
                </p>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">
            Before You Go
          </h2>
          <ul className="space-y-3">
            {trailDetails.beforeYouGo?.map(
              (item: { text: string; href?: string }, index: number) => {
                if (!item.text?.trim()) {
                  return null; // Skip rendering if the text is empty
                }
                return (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-stone-700">{item.text}</span>
                    )}
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            to="/trails"
            className="text-emerald-600 hover:text-emerald-700 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndividualTrailPage;
