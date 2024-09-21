import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AthleteSearchComponent from "../components/common/AthleteSearch";

// Fake data for athletes (replace with API call in production)
const fakeAthletes = [
  {
    id: 1,
    name: "Usain Bolt",
    country: "Jamaica",
    discipline: "Sprints",
    image: "https://example.com/usain-bolt.jpg",
  },
  {
    id: 2,
    name: "Eliud Kipchoge",
    country: "Kenya",
    discipline: "Marathon",
    image: "https://example.com/eliud-kipchoge.jpg",
  },
  {
    id: 3,
    name: "Allyson Felix",
    country: "USA",
    discipline: "Sprints",
    image: "https://example.com/allyson-felix.jpg",
  },
  {
    id: 4,
    name: "Mo Farah",
    country: "UK",
    discipline: "Long-distance",
    image: "https://example.com/mo-farah.jpg",
  },
  {
    id: 5,
    name: "Shelly-Ann Fraser-Pryce",
    country: "Jamaica",
    discipline: "Sprints",
    image: "https://example.com/shelly-ann-fraser-pryce.jpg",
  },
  // Add more athletes as needed
];

const AthletesListPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setAthletes(fakeAthletes);
      setLoading(false);
    }, 1000);
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
            to={`/athletes/${athlete.id}`}
            key={athlete.id}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={athlete.image}
                alt={athlete.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{athlete.name}</h2>
                <p className="text-gray-600">{athlete.country}</p>
                <p className="text-gray-600">{athlete.discipline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AthletesListPage;
