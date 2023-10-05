import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    // Obtener las opciones de filtro avanzado desde la API
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((response) => {
        const filterOptions = {
          status: [],
          species: [],
          type: [],
          gender: [],
          location: [],
        };

        response.data.results.forEach((character) => {
          filterOptions.status.push(character.status);
          filterOptions.species.push(character.species);
          filterOptions.type.push(character.type);
          filterOptions.gender.push(character.gender);
          filterOptions.location.push(character.location.name);
        });

        // Eliminar duplicados y ordenar
        for (const option in filterOptions) {
          filterOptions[option] = [...new Set(filterOptions[option])].sort();
        }

        setFilterOptions(filterOptions);
      })
      .catch((error) => {
        console.error('Error fetching filter options:', error);
      });
  }, []);

  useEffect(() => {
    // Realizar la búsqueda
    handleSearch();
  }, [currentPage, selectedFilter, filterValue, searchTerm]); // Agregamos searchTerm a las dependencias

  const handleSearch = () => {
    let apiUrl = `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${currentPage}`;

    if (selectedFilter !== 'name' && filterValue) {
      apiUrl += `&${selectedFilter}=${filterValue}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto container">
      <form className="flex items-center space-x-4">
        <div className="relative flex-1">
          <select
            className="form-select block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            value={selectedFilter}
            onChange={(event) => setSelectedFilter(event.target.value)}
          >
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="species">Species</option>
            <option value="type">Type</option>
            <option value="gender">Gender</option>
            <option value="location">Location</option>
          </select>
        </div>

        {selectedFilter !== 'name' && (
          <div className="relative flex-1">
            <select
              className="form-select block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
            >
              <option value="">Select an option</option>
              {filterOptions[selectedFilter].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="relative flex-2">
          <input
            type="search"
            id="search-dropdown"
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search by name"
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)} // Actualizamos searchTerm aquí
            required
          />
          <button
            type="button" // Cambiamos el tipo a "button" para evitar enviar el formulario
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>


			<section className="bg-white dark:bg-gray-900">
				<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
					<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
						<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Characters</h2>
						<p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Explore the whole collection of characters from Rick and Morty</p>
					</div>
					<div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{characters.map((character) => (
							<div className="text-center text-gray-500 dark:text-gray-400" key={character.id}>
								<div className="bg-white dark:bg-gray-900 p-4 hover:shadow-lg hover:bg-lime-100 dark:hover:bg-lime-800 rounded-lg">
									{/* Utiliza el componente Link para enlazar a la página individual */}
									<Link to={`/characters/${character.id}`}>
										<img className="mx-auto mb-4 w-36 h-36 rounded-full" src={character.image} alt={character.name} />
										<h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
											{character.name}
										</h3>
										<p>{`Status: ${character.status}`}</p>
										<p>{`Species: ${character.species}`}</p>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<div class="flex flex-col items-center">
				{/* <!-- Help text --> */}
				{/* <span class="text-sm text-gray-700 dark:text-gray-400">
					Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">10</span> of <span class="font-semibold text-gray-900 dark:text-white">100</span> Entries
				</span> */}
				{/* <!-- Buttons --> */}
				<div class="inline-flex mt-2 xs:mt-0">
					<button
						className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
					>
						Prev
					</button>
					<button
						className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
