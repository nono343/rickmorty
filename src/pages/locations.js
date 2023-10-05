import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Planets from "../img/planets.jpg";


export const Locations = () => {
	const [locations, setLocations] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('name');
	const [filterValue, setFilterValue] = useState('');
	const [filterOptions, setFilterOptions] = useState({ type: [], dimension: [] });
  
	useEffect(() => {
	  // Realizar una solicitud a la API para obtener las ubicaciones
	  axios
		.get(`https://rickandmortyapi.com/api/location?page=${currentPage}`)
		.then((response) => {
		  // Obtener todas las ubicaciones
		  const allLocations = response.data.results;
  
		  // Extraer tipos y dimensiones únicas
		  const uniqueTypes = [...new Set(allLocations.map((location) => location.type))];
		  const uniqueDimensions = [...new Set(allLocations.map((location) => location.dimension))];
  
		  // Ordenar tipos y dimensiones
		  uniqueTypes.sort();
		  uniqueDimensions.sort();
  
		  // Actualizar el estado de filterOptions
		  setFilterOptions({ type: uniqueTypes, dimension: uniqueDimensions });
		})
		.catch((error) => {
		  console.error('Error fetching filter options:', error);
		});
	}, [currentPage]);
  
	useEffect(() => {
	  handleSearch();
	}, [currentPage, selectedFilter, filterValue, searchTerm]);
  
	const handleSearch = () => {
	  let apiUrl = `https://rickandmortyapi.com/api/location/?name=${searchTerm}&page=${currentPage}`;
  
	  if (selectedFilter !== 'name' && filterValue) {
		apiUrl += `&${selectedFilter}=${filterValue}`;
	  }
  
	  axios
		.get(apiUrl)
		.then((response) => {
		  setLocations(response.data.results);
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
  
	const handleFilterChange = (event) => {
	  setSelectedFilter(event.target.value);
	  setFilterValue('');
	};
  
	const handleFilterValueChange = (event) => {
	  setFilterValue(event.target.value);
	};
  
	return (
	  <div className="max-w-screen-xl mx-auto container">
		<form className="flex items-center space-x-4">
		  <div className="relative flex-1">
			<select
			  className="form-select block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
			  value={selectedFilter}
			  onChange={(event) => handleFilterChange(event)}
			>
			  <option value="name">Name</option>
			  {Object.keys(filterOptions).map((option) => (
				<option key={option} value={option}>
				  {option.charAt(0).toUpperCase() + option.slice(1)}
				</option>
			  ))}
			</select>
		  </div>
  
		  {selectedFilter !== 'name' && (
			<div className="relative flex-1">
			  <select
				className="form-select block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
				value={filterValue}
				onChange={(event) => handleFilterValueChange(event)}
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
			  onChange={(event) => setSearchTerm(event.target.value)}
			  required
			/>
			<button
			  type="submit"
			  className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			  onClick={handleSearch}
			>
			  <svg
				className="w-4 h-4"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			  >
				<path
				  stroke="currentColor"
				  strokeLinecap="round"
				  strokeLinejoin="round"
				  strokeWidth="2"
				  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			  </svg>
			  <span className="sr-only">Search</span>
			</button>
		  </div>
		</form>
  
		{/* Resto del contenido */}
		<section className="bg-white dark:bg-gray-900">
		  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
			<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
			  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Locations</h2>
			  <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Explore the collection of locations from Rick and Morty</p>
			</div>
			<div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			  {locations.map((location) => (
				<div className="text-center text-gray-500 dark:text-gray-400" key={location.id}>
				  <div className="bg-white dark:bg-gray-900 p-4 hover:shadow-lg hover:bg-lime-100 dark:hover:bg-lime-800 rounded-lg">
					{/* Utiliza el componente Link para enlazar a la página individual */}
					<Link to={`/locations/${location.id}`}>
					  <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={Planets} alt={location.name} />
					  <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{location.name}
					  </h3>
					  <p>{`Type: ${location.type}`}</p>
					  <p>{`Dimension: ${location.dimension}`}</p>
					</Link>
				  </div>
				</div>
			  ))}
			</div>
		  </div>
		</section>
		<div className="flex flex-col items-center">
		  <span className="text-sm text-gray-700 dark:text-gray-400">
			Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">10</span> of <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
		  </span>
		  <div className="inline-flex mt-2 xs:mt-0">
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
  