"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { searchForAthlete } from "@/app/services/athleteService";
import { VectorSearchResult } from "@/app/services/types";

const AthleteSearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<VectorSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term) {
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
      } else {
        setSearchResults([]);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleAthleteSelect = (athleteId: number) => {
    router.push(`/athletes/${athleteId}`);
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
      </div>
      {searchResults.length > 0 && (
        <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {searchResults.map((athlete) => (
            <div
              key={athlete.athlete_id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleAthleteSelect(athlete.athlete_id)}
            >
              <div className="w-12 h-12 relative mr-4 flex-shrink-0">
                {athlete.hq_images && athlete.hq_images.length > 0 ? (
                  <Image
                    src={athlete.hq_images[0]}
                    alt={athlete.full_name}
                    fill
                    sizes="48px"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {athlete.full_name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold">{athlete.full_name}</div>
                <div className="text-sm text-gray-600">
                  {athlete.primary_disciplines}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AthleteSearchComponent;

// Debounce utility function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
