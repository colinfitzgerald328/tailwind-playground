"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { getAthleteById } from "../../services/athleteService";
import { QueriedAthlete } from "../../services/types";
import { Medal } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const AthleteDisplayPage = () => {
  const { id } = useParams();
  const [athleteData, setAthleteData] = useState<QueriedAthlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedAthlete, setExpandedAthlete] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        if (id) {
          const data = await getAthleteById(Number(id));
          setAthleteData(data);
        }
      } catch (err) {
        setError("Failed to fetch athlete data");
        console.error("Error fetching athlete data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthleteData();
  }, [id]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 100;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading athlete details...</div>;
  }

  if (error || !athleteData) {
    return (
      <div className="text-center py-10 text-red-500">
        {error || "Athlete not found"}
      </div>
    );
  }

  const { athlete, results, top_competitors } = athleteData;

  const getMedalColor = (place: number) => {
    switch (place) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-orange-400";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
            {athlete.hq_images && athlete.hq_images.length > 0 ? (
              <>
                <img
                  src={athlete.hq_images[selectedImage]}
                  alt={`${athlete.first_name} ${athlete.last_name}`}
                  className="w-full h-auto rounded-lg shadow-md mb-2"
                />
                <div className="relative">
                  <button
                    onClick={() => scrollCarousel("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                  >
                    &#8592;
                  </button>
                  <div
                    ref={carouselRef}
                    className="flex overflow-x-auto scrollbar-hide space-x-2 py-2"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    {athlete.hq_images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${athlete.first_name} ${athlete.last_name}`}
                        className={`w-20 h-20 object-cover flex-shrink-0 cursor-pointer rounded ${selectedImage === index ? "border-2 border-blue-500" : ""}`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => scrollCarousel("right")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                  >
                    &#8594;
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                No image available
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{`${athlete.first_name} ${athlete.last_name}`}</h1>
            <p className="text-gray-600 mb-2">Born: {athlete.date_of_birth}</p>
            <p className="text-gray-600 mb-2">Country: {athlete.country}</p>
            <p className="text-gray-600 mb-4">
              Disciplines: {athlete.primary_disciplines}
            </p>
            {athlete.accomplishments && athlete.accomplishments.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-2">Accomplishments</h2>
                <ul className="list-disc pl-5">
                  {athlete.accomplishments.map((accomplishment, index) => (
                    <li key={index} className="text-gray-700">
                      {accomplishment}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {results && results.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Recent Results</h2>
          <div className="max-h-96 overflow-y-auto pr-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="mb-4 pb-4 border-b last:border-b-0 flex items-start"
              >
                <div className="mr-4">
                  <Medal
                    className={`w-6 h-6 ${getMedalColor(Number(result.place))}`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg">{result.competition}</p>
                  <p className="text-gray-600">
                    {new Date(result.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-700">{result.discipline}</p>
                  <p className="text-gray-700">
                    Place: <span className="font-medium">{result.place}</span>,
                    Mark: <span className="font-medium">{result.mark}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {top_competitors && top_competitors.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Top Competitors</h2>
          <div className="space-y-6">
            {top_competitors.map((competitor) => (
              <div
                key={competitor.athlete_id}
                className="border rounded-lg p-4 hover:shadow-md transition duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <Link href={`/athletes/${competitor.athlete_id}`} passHref>
                    <img
                      src={
                        competitor.hq_images?.[0] || "/api/placeholder/400/300"
                      }
                      alt={`${competitor.first_name} ${competitor.last_name}`}
                      className="w-full md:w-48 h-48 object-cover rounded-lg mb-4 md:mb-0"
                    />
                  </Link>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-xl">{`${competitor.first_name} ${competitor.last_name}`}</h3>
                    <p className="text-gray-600">
                      {competitor.primary_disciplines}
                    </p>
                    <button
                      onClick={() =>
                        setExpandedAthlete(
                          expandedAthlete === competitor.athlete_id
                            ? null
                            : competitor.athlete_id,
                        )
                      }
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      {expandedAthlete === competitor.athlete_id
                        ? "Show less"
                        : "Show more"}
                    </button>
                  </div>
                </div>
                {expandedAthlete === competitor.athlete_id && (
                  <div className="mt-4">
                    {competitor.markdown_summary && (
                      <div className="mb-4">
                        <ReactMarkdown>
                          {competitor.markdown_summary}
                        </ReactMarkdown>
                      </div>
                    )}
                    {competitor.hq_images &&
                      competitor.hq_images.length > 1 && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {competitor.hq_images.slice(1).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${competitor.first_name} ${competitor.last_name} - ${index + 2}`}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AthleteDisplayPage;
