"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import AthleteSearchComponent from "../components/common/AthleteSearch";
import { getAthletesList } from "../services/athleteService";
import { AthleteListResult } from "../services/types";

const AthletesListPage = () => {
  const [athletes, setAthletes] = useState<AthleteListResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastAthleteElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prevOffset => prevOffset + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchAthletes = async () => {
    try {
      setLoading(true);
      const fetchedAthletes = await getAthletesList(offset);
      setAthletes(prevAthletes => [...prevAthletes, ...fetchedAthletes]);
      setHasMore(fetchedAthletes.length > 0);
    } catch (err) {
      console.error("Error fetching athletes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, [offset]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Track and Field Athletes</h1>
      <div className="mb-8">
        <AthleteSearchComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete, index) => (
          <Link
            href={`/athletes/${athlete.athlete_id}`}
            key={athlete.athlete_id}
            className="block"
          >
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              ref={index === athletes.length - 1 ? lastAthleteElementRef : null}
            >
              <img
                src={athlete.hq_images ? athlete.hq_images[0] : "/placeholder-image.jpg"}
                alt={`${athlete.full_name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {athlete.full_name}
                </h2>
                <p className="text-gray-600">{athlete.country}</p>
                <p className="text-gray-600">{athlete.primary_disciplines}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loading && <div className="text-center py-4">Loading more athletes...</div>}
      {!hasMore && <div className="text-center py-4">No more athletes to load</div>}
    </div>
  );
};

export default AthletesListPage;
