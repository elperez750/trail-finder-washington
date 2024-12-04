import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  length: string;
  difficulty: string;
  location: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    length: '',
    difficulty: '',
    location: '',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          placeholder="Search trails..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-5 pr-12 rounded-full bg-white border-2 border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 text-stone-800 placeholder-stone-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all duration-300"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center focus:outline-none"
        >
          {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isFiltersOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-stone-700 mb-1">Trail Length</label>
            <select
              id="length"
              name="length"
              value={filters.length}
              onChange={handleFilterChange}
              className="w-full p-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Any</option>
              <option value="short">Short (&lt;5 miles)</option>
              <option value="medium">Medium (5-10 miles)</option>
              <option value="long">Long (&gt;10 miles)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-stone-700 mb-1">Difficulty Level</label>
            <select
              id="difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              className="w-full p-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-stone-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter region or zip code"
              className="w-full p-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;