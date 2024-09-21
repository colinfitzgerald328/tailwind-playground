import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              Track and Field Hub
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-blue-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/athletes" className="hover:text-blue-200">
                    Athletes
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-blue-200">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/records" className="hover:text-blue-200">
                    Records
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-200">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 Track and Field Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
