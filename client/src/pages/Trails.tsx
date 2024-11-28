import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import TrailCard from "../components/TrailCard";

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

const Trails: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchTrails = async (searchQuery: string, currentPage: number) => {
    try {
      const response = await axios.get<{ trails: Trail[], totalPages: number }>(
        `http://localhost:8000/api/trails/filtered-trails?name=${searchQuery}&page=${currentPage}`
      );
      setTrails(response.data.trails);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching trails:", err);
    }
  };

  useEffect(() => {
    fetchTrails(search, page);
  }, [page, search]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-2 rounded-md ${
            page === i
              ? 'bg-emerald-600 text-white'
              : 'bg-stone-200 text-stone-800 hover:bg-stone-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-stone-100 min-h-screen">
      <SearchBar onSearch={handleSearch} />
      <h1 className="text-5xl mb-6 text-emerald-800 font-bold">Trails</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
        {trails.map((trail: Trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
      <div className="pagination-controls flex items-center space-x-2 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-stone-200 text-stone-800 hover:bg-stone-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-stone-200 text-stone-800 hover:bg-stone-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Trails;