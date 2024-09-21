"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';

// Fake data for search results (replace with API call in production)
const fakeAthletes = [
  { id: 1, name: "Usain Bolt", country: "Jamaica", discipline: "Sprints" },
  { id: 2, name: "Eliud Kipchoge", country: "Kenya", discipline: "Marathon" },
  { id: 3, name: "Allyson Felix", country: "USA", discipline: "Sprints" },
  { id: 4, name: "Mo Farah", country: "UK", discipline: "Long-distance" },
  {
    id: 5,
    name: "Shelly-Ann Fraser-Pryce",
    country: "Jamaica",
    discipline: "Sprints",
  },
];

const AthleteSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Search function
  const searchAthletes = (term) => {
    const results = fakeAthletes.filter(
      (athlete) =>
        athlete.name.toLowerCase().includes(term.toLowerCase()) ||
        athlete.country.toLowerCase().includes(term.toLowerCase()) ||
        athlete.discipline.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
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
  const handleAthleteSelect = (athleteId) => {
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
        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {searchResults.map((athlete) => (
              <div
                key={athlete.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAthleteSelect(athlete.id)}
              >
                <div className="font-semibold">{athlete.name}</div>
                <div className="text-sm text-gray-600">
                  {athlete.country} - {athlete.discipline}
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
