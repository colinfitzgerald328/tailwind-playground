import React, { useState } from "react";
export default function AthletePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const athleteData = {
    athlete: {
      first_name: "Jakob",
      last_name: "INGEBRIGTSEN",
      date_of_birth: "19 SEP 2000",
      country: "NOR",
      primary_disciplines: "2000 Metres, 1500 Metres, 800 Metres",
      accomplishments: [
        "1xOlympic champion",
        "2xWorld champion",
        "3xDiamond League Final winner",
        "2xWorld Championships Silver medallist",
        "More Honours",
      ],
      hq_images: [
        "https://media.gettyimages.com/id/1748833294/photo/vilnius-lithuania-jakob-ingebrigtsen-and-femke-bol-pose-for-a-photo-with-their-european.jpg?s=612x612&w=0&k=20&c=rl36PFNEqD3K54Sf5IvmaCnEjeIIPSNK8AIlCh3na68=",
        "https://media.gettyimages.com/id/1748833253/photo/vilnius-lithuania-jakob-ingebrigtsen-and-femke-bol-pose-for-a-photo-with-their-european.jpg?s=612x612&w=0&k=20&c=jUfYmK0SjbzcyZh_Fr4ojMWzDJSJfVDinWN6l8ianEo=",
        "https://media.gettyimages.com/id/1748801886/photo/vilnius-lithuania-jakob-ingebrigtsen-poses-for-a-photo-for-a-photo-with-dobromir-karamarinov.jpg?s=612x612&w=0&k=20&c=shNAMwVnCM8PyI8RiQgogndAJinq2PPSyrxjDbmKEGw=",
      ],
    },
    results: [
      {
        date: "25 AUG 2024",
        competition: "Silesia Kamila Skolimowska Memorial",
        discipline: "3000 Metres",
        place: "1.",
        mark: "7:17.55",
      },
      {
        date: "22 AUG 2024",
        competition: "Athletissima Lausanne",
        discipline: "1500 Metres",
        place: "1.",
        mark: "3:27.83",
      },
      {
        date: "10 AUG 2024",
        competition: "The XXXIII Olympic Games",
        discipline: "5000 Metres",
        place: "1.",
        mark: "13:13.66",
      },
    ],
    top_competitors: [
      {
        first_name: "Samuel",
        last_name: "TEFERA",
        primary_disciplines:
          "1500 Metres Short Track, 1500 Metres, 5000 Metres",
      },
      {
        first_name: "Josh",
        last_name: "KERR",
        primary_disciplines: "Two Miles Short Track, 1500 Metres, 800 Metres",
      },
      {
        first_name: "Oliver",
        last_name: "HOARE",
        primary_disciplines: "1500 Metres Short Track, 1500 Metres, One Mile",
      },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search for an athlete..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
            <img
              src={athleteData.athlete.hq_images[selectedImage]}
              alt={`${athleteData.athlete.first_name} ${athleteData.athlete.last_name}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="flex justify-center mt-2">
              {athleteData.athlete.hq_images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${athleteData.athlete.first_name} ${athleteData.athlete.last_name}`}
                  className={`w-20 h-20 object-cover mx-1 cursor-pointer rounded ${
                    selectedImage === index ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{`${athleteData.athlete.first_name} ${athleteData.athlete.last_name}`}</h1>
            <p className="text-gray-600 mb-2">
              Born: {athleteData.athlete.date_of_birth}
            </p>
            <p className="text-gray-600 mb-2">
              Country: {athleteData.athlete.country}
            </p>
            <p className="text-gray-600 mb-4">
              Disciplines: {athleteData.athlete.primary_disciplines}
            </p>
            <h2 className="text-xl font-semibold mb-2">Accomplishments</h2>
            <ul className="list-disc pl-5">
              {athleteData.athlete.accomplishments.map(
                (accomplishment, index) => (
                  <li key={index} className="text-gray-700">
                    {accomplishment}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Results</h2>
        {athleteData.results.map((result, index) => (
          <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
            <p className="font-semibold">
              {result.date} - {result.competition}
            </p>
            <p className="text-gray-700">{result.discipline}</p>
            <p className="text-gray-700">
              Place: {result.place}, Mark: {result.mark}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Top Competitors</h2>
        {athleteData.top_competitors.map((competitor, index) => (
          <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
            <p className="font-semibold">{`${competitor.first_name} ${competitor.last_name}`}</p>
            <p className="text-gray-700">{competitor.primary_disciplines}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
