import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Location = () => {
  const { theid } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Realiza una llamada a la API de Rick and Morty para obtener detalles de la ubicación
    fetch(`https://rickandmortyapi.com/api/location/${theid}`)
      .then((response) => response.json())
      .then((data) => setLocation(data))
      .catch((error) => console.error("Error fetching location details:", error));
  }, [theid]);

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{location.name}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Type: {location.type}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Dimension: {location.dimension}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Residents: {location.residents.length}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Created: {location.created}</p>
          <div className="flex justify-center"> {/* Clases para centrar */}
            <Link to="/locations" className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Back to Locations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
