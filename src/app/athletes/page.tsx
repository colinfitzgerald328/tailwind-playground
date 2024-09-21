"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AthleteSearchComponent from "../components/common/AthleteSearch";
import { getAthleteById } from "../services/athleteService";
import { QueriedAthlete } from "../services/types";

const idsToFire = [
  14164861, 14165762, 14165989, 14166054, 14166242, 14166878, 14167392,
  14167400, 14167518, 14167545,
];

const AthletesListPage = () => {
  const [athletes, setAthletes] = useState<QueriedAthlete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const fetchedAthletes = await Promise.all(idsToFire.map((id) => getAthleteById(id)));
        setAthletes(fetchedAthletes);
      } catch (err) {
        console.error("Error fetching athletes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading athletes...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Track and Field Athletes</h1>
      <div className="mb-8">
        <AthleteSearchComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <Link
            href={`/athletes/${athlete.athlete.athlete_id}`}
            key={athlete.athlete.id}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={athlete.athlete.hq_images ? athlete.athlete.hq_images[0] : "/placeholder-image.jpg"}
                alt={`${athlete.athlete.first_name} ${athlete.athlete.last_name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {athlete.athlete.first_name} {athlete.athlete.last_name}
                </h2>
                <p className="text-gray-600">{athlete.athlete.country}</p>
                <p className="text-gray-600">{athlete.athlete.primary_disciplines}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AthletesListPage;
