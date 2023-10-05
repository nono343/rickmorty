import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Planets from "../img/planets.jpg";

export const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [seasonFilter, setSeasonFilter] = useState('');

  useEffect(() => {
    let apiUrl = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;

    if (seasonFilter) {
      apiUrl += `&episode=${seasonFilter}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setEpisodes(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage, seasonFilter]);

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

  const handleSeasonFilterChange = (event) => {
    setSeasonFilter(event.target.value);
    setCurrentPage(1);
  };

  return (    
  <div className="max-w-screen-xl mx-auto container">
  <form className="flex items-center space-x-4">
    <div className="relative flex-1">
      <select
        className="form-select block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        value={seasonFilter}
        onChange={handleSeasonFilterChange}
      >
        <option value="">All Seasons</option>
        <option value="S01">Season 1</option>
        <option value="S02">Season 2</option>
        <option value="S03">Season 3</option>
        <option value="S04">Season 4</option>
        <option value="S05">Season 5</option>
        {/* Puedes agregar más temporadas según sea necesario */}
      </select>
    </div>
  </form>
  <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {episodes.map((episode) => (
      <div className="text-center text-gray-500 dark:text-gray-400" key={episode.id}>
        <div className="bg-white dark:bg-gray-900 p-4 hover:shadow-lg hover:bg-lime-100 dark:hover:bg-lime-800 rounded-lg">
        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={Planets} alt={episode.name} />

          <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {episode.name}
          </h5>
          <p>Air Date: {episode.air_date}</p>
          <p>Episode Code: {episode.episode}</p>
          <a href={episode.url} className="btn btn-primary">
            View Episode
          </a>
        </div>
      </div>
    ))}
  </div>
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

</div>
);
};
