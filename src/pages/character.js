import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Character = () => {
    const { theid } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        // Realiza una llamada a la API de Rick and Morty para obtener detalles del personaje
        fetch(`https://rickandmortyapi.com/api/character/${theid}`)
            .then((response) => response.json())
            .then((data) => setCharacter(data))
            .catch((error) => console.error("Error fetching character details:", error));
    }, [theid]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                    className="rounded-full"
                    src={character.image}
                    alt={character.name}
                />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{character.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: {character.status}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Species: {character.species}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Type: {character.type}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Gender: {character.gender}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Origin: {character.origin.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {character.location.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Created: {character.created}</p>
                    <div className="flex justify-center"> {/* Clases para centrar */}
                        <Link to="/characters" className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Back to Characters
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
