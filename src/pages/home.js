import React from "react";
import { Link } from 'react-router-dom';
import Episodes from "../img/episodes.png";
import Characters from "../img/characters.png";
import Planets from "../img/planets.png";


export const Home = () => {

    return (
        <div className="container mx-auto">
            {/* Section 1 */}
            <section className="bg-white mx-4 my-4 rounded-md shadow-md border transition duration-300 hover:shadow-lg transform hover:scale-104">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <h1 className="max-w-2xl mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-lime-500 dark:text-lime-900 text-center">Meet the Wacky Characters!</h1>
                        <p className="max-w-2xl mb-6 text-sm md:text-base lg:text-lg font-light text-gray-500 dark:text-gray-400 text-center">From the zany to the bizarre, explore the quirky characters that make Rick and Morty a sci-fi adventure like no other.</p>
                        <Link to="/characters" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mt-2">Start Exploring</Link>
                    </div>
                    <div className="lg:flex items-center justify-center lg:col-span-5">
                        <img src={Characters} alt="mockup" className="w-full lg:w-auto h-auto" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white mx-4 my-4 rounded-md shadow-md border transition duration-300 hover:shadow-lg transform hover:scale-104">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <h1 className="max-w-2xl mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-lime-500 dark:text-lime-900 text-center">Explore Strange New Worlds!</h1>
                        <p className="max-w-2xl mb-6 text-sm md:text-base lg:text-lg font-light text-gray-500 dark:text-gray-400 text-center">From the bizarre to the surreal, dive into the otherworldly locations that Rick and Morty visit in their adventures.</p>
                        <Link to="/locations" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mt-2">Discover all the Locations</Link>
                    </div>
                    <div className="lg:flex items-center justify-center lg:col-span-5">
                        <img src={Planets} alt="mockup" className="w-full lg:w-auto h-auto" />
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white mx-4 my-4 rounded-md shadow-md border transition duration-300 hover:shadow-lg transform hover:scale-104">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <h1 className="max-w-2xl mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-lime-500 dark:text-lime-900 text-center">Rick and Morty Adventures Galore!</h1>
                        <p className="max-w-2xl mb-6 text-sm md:text-base lg:text-lg font-light text-gray-500 dark:text-gray-400 text-center">From dimension-hopping escapades to mind-bending adventures, explore the wild and wacky episodes of Rick and Morty.</p>
                        <Link to="/episodes" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mt-2">Start Watching</Link>
                    </div>
                    <div className="lg:flex items-center justify-center lg:col-span-5">
                        <img src={Episodes} alt="mockup" className="w-full lg:w-auto h-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
};
