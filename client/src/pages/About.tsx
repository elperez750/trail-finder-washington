import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">About Washington Trails</h1>
        
        <div className="mb-6">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQHpzlVyWTwgxQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729106559068?e=1738195200&v=beta&t=GbvBDN4-dHOMdnnGe2CuPycn0SCV-H8a0d2kYV4c1t8"
            alt="Elliott Perez"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-emerald-700">John Doe</h2>
          <p className="text-gray-600 italic">Creator of Washington Trails</p>
        </div>

        <p className="text-gray-700 mb-4">
          Washington Trails is a personal project born out of my passion for hiking and exploring the beautiful landscapes of Washington State. As an avid hiker and nature enthusiast, I wanted to create a platform that would help others discover and enjoy the incredible trails our state has to offer.
        </p>

        <p className="text-gray-700 mb-4">
          This app is designed to be your companion in planning outdoor adventures, providing detailed information about various trails, their difficulty levels, and what you can expect to see along the way. From the majestic peaks of the Cascades to the serene coastal walks, Washington Trails aims to be your go-to resource for all things hiking in Washington.
        </p>

        <p className="text-gray-700 mb-4">
          As a personal project, Washington Trails is continuously evolving. I'm always working on improving the app, adding new features, and updating trail information to ensure you have the best possible experience both in planning your hikes and on the trails themselves.
        </p>

        <p className="text-gray-700">
          Thank you for using Washington Trails. I hope this app inspires you to get out there and explore the natural beauty of our wonderful state. Happy hiking!
        </p>
      </div>
    </div>
  )
}

export default About