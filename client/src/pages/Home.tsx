import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TrailCard from '../components/TrailCard'
import axios from 'axios'

interface Trail {
  id: number;
  name: string;
  description: string;
  elevation: string
  highestPoint: string;
  imageUrl: string;
  length: string;
  link: string;
  location: string;
}

const HomePage = () => {
  const [trails, setTrails] = useState<Trail[]>([]);  // State to store trails

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/trails/random-trails');  // Axios GET request
        setTrails(response.data);  // Update state with fetched data
      } catch (err: any) {
        console.error('Error fetching trails:', err);
      }
    };
    fetchTrails();
  }, []);  

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center">
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        <section className="mb-12 text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Welcome to Washington Trails</h2>
          <p className="text-gray-700 mb-4">
            Washington Trails is your ultimate guide to exploring the beautiful hiking trails of Washington State. 
            Our app provides detailed information about various trails, helping you plan your next outdoor adventure.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you're a seasoned hiker or just starting out, our curated list of trails offers options for all skill levels. 
            From the challenging peaks of Mount Rainier to the serene coastal walks, find your perfect trail with Washington Trails.
          </p>
        </section>

        <section className="w-full">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">Explore Our Trails</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {trails.map((trail) => (
                <div key={trail.id} className="flex justify-center">
                  <TrailCard trail={trail} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage