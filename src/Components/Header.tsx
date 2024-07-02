
import React from 'react'

const Header = () => {
  return (
    <div className="w-full h-svh flex  flex-row ">
        <div className="w-full h-svh bg-bgcolor flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl md:text-7xl font-bold mb-4 text-blue-600">
              Explore the Wonders
            </h1>
            <p className="text-lg md:text-2xl text-purple-300 ">
              Discover stories that captivate and inspire.
            </p>
          </div>
        </div>
        <div className="w-full h-svh bg-transparent  flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl md:text-7xl font-bold mb-4 text-white">
              Unleash Your Imagination
            </h1>
            <p className="text-lg md:text-2xl font-semibold text-red-200">
              Dive into a world of creativity and adventure.
            </p>
          </div>
        </div>
      </div>
  )
}

export default Header