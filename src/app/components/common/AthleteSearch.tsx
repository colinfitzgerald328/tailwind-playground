"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { searchForAthlete } from "@/app/services/athleteService";
import { VectorSearchResult } from "@/app/services/types";

const AthleteSearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<VectorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Debounce function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Search function
  const searchAthletes = async (term: string) => {
    setIsLoading(true);
    try {
      const results = await searchForAthlete(term);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(debounce(searchAthletes, 300), []);

  // Effect to trigger search on searchTerm change
  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, debouncedSearch]);

  // Handle athlete selection
  const handleAthleteSelect = (athleteId: number) => {
    router.push(`/athletes/${athleteId}`);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for an athlete..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {searchResults.map((athlete) => (
              <div
                key={athlete.athlete_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAthleteSelect(athlete.athlete_id)}
              >
                <div className="font-semibold">{athlete.full_name}</div>
                <div className="text-sm text-gray-600">
                  {athlete.primary_disciplines}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteSearchComponent;