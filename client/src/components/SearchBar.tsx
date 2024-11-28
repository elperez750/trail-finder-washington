import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(searchQuery);

  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };



  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full border-black">
      <div className="container mx-auto flex items-center">
        <input
          type="text"
          placeholder="Search trails..."
          value={searchQuery}
          onChange={(e) => handleChange(e)}
          className="flex-grow py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-400 border-4"
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="bg-stone-800 text-white py-2 px-6 rounded-r-md hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <Search className="h-5 w-5 inline-block mr-2" />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
