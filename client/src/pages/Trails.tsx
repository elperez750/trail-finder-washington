import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import TrailCard from "../components/TrailCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NoTrailsFound from "../components/NoTrailsFound";
import { Trail } from "../types/trail";


const Trails: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ searchQuery: "", length: "" });
  const [isLoading, setIsLoading] = useState(false);


  
  const fetchTrails = async (searchQuery: string, length: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ trails: Trail[]; totalPages: number }>(
        `http://localhost:8000/api/trails/filtered-trails?name=${searchQuery}&length=${length}&page=${currentPage}`
      );

      setTrails(response.data.trails);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching trails:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrails("", "any", page);
  }, []);


  useEffect(() => {
    fetchTrails(search.searchQuery, search.length, page);
  }, [page, search]);

  const handleSearch = (query: string, length: string) => {
    setSearch({ searchQuery: query, length: length });
    setPage(1);
  };

  function generatePagination(currentPage: number, totalPages: number) {
    const pagination = [];
    const visiblePages = 3;

    for (let i = 1; i <= Math.min(visiblePages, totalPages); i++) {
      pagination.push(i);
    }

    if (currentPage > visiblePages + 1) {
      pagination.push("...");
    }

    for (
      let i = Math.max(visiblePages + 1, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - visiblePages);
      i++
    ) {
      pagination.push(i);
    }

    if (currentPage < totalPages - visiblePages) {
      pagination.push("...");
    }

    for (
      let i = Math.max(totalPages - visiblePages + 1, visiblePages + 2);
      i <= totalPages;
      i++
    ) {
      pagination.push(i);
    }

    return pagination;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-stone-100 to-emerald-50 min-h-screen">
      <div className="w-full max-w-7xl">
        <SearchBar onSearch={handleSearch} />
        <h1 className="text-4xl sm:text-5xl mb-6 text-emerald-800 font-bold text-center mt-8">
          Discover Trails
        </h1>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : trails.length == 0 ? (
          <NoTrailsFound />
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
             
              {trails.map((trail: Trail) => (
                <TrailCard key={trail._id} trail={trail} />
                
              ))}
            </div>

            <div className="pagination-controls flex flex-wrap justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Prev
              </button>
              <div className="flex flex-wrap justify-center space-x-1 my-2">
                {generatePagination(page, totalPages).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => typeof item === "number" && setPage(item)}
                    disabled={item === "..."}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                      item === page
                        ? "bg-emerald-600 text-white shadow-md"
                        : item === "..."
                        ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                        : "bg-white text-stone-800 hover:bg-stone-200 shadow hover:shadow-md"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Trails;
