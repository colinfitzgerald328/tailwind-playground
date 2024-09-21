import React from "react";
import { Link } from "react-router-dom";
import AthleteSearchComponent from "../components/common/AthleteSearch";

const HomePage = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Track and Field Hub
          </h1>
          <p className="text-xl mb-8">
            Your ultimate source for track and field athletes, events, and
            records.
          </p>
          <AthleteSearchComponent />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/athletes"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-2">Athletes</h2>
          <p>
            Explore profiles of top track and field athletes from around the
            world.
          </p>
        </Link>
        <Link
          to="/events"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-2">Events</h2>
          <p>
            Stay updated with the latest track and field events and
            competitions.
          </p>
        </Link>
        <Link
          to="/records"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-2">Records</h2>
          <p>
            Discover world records and outstanding performances in various
            disciplines.
          </p>
        </Link>
      </section>

      {/* Recent News Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Recent News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              New World Record in Men's 100m
            </h3>
            <p className="text-gray-600 mb-4">
              John Doe sets a new world record of 9.43 seconds in the men's 100m
              sprint.
            </p>
            <Link to="/news/1" className="text-blue-600 hover:underline">
              Read more
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              Upcoming Diamond League Event
            </h3>
            <p className="text-gray-600 mb-4">
              The next Diamond League event is scheduled for next month in
              Paris.
            </p>
            <Link to="/news/2" className="text-blue-600 hover:underline">
              Read more
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-4">
          Subscribe to our newsletter for the latest track and field news and
          updates.
        </p>
        <form className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
