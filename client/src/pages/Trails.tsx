import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useState } from "react";


const Trails = () => {
  const onSubmit = (search: string) => {    
    const filteredTrails = axios.get('http://localhost:8000/api/trails/filtered-trails', {
        
    })
  }



  return (
    <div className="flex flex-col items-center justify-center p-10">
      <SearchBar onSearch={onSubmit} />
      <h1 className="text-5xl">Trails</h1>
      
    </div>
  )
}

export default Trails
