import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "wouter";
import recipeService from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

function HomeView() {
  const [recipes, setRecipes] = useState([]);
  const [displayedData, setDisplayedData] = useState(recipes);
  const [visibleItemCount, setVisibleItemCount] = useState(3);

  useEffect(function () {
    (async function () {
      const result = await recipeService.getLikedRecipes();
      setRecipes(result);
      setDisplayedData(result.slice(0, visibleItemCount));
    })();
  });

  const handleLoadMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 3);
    setDisplayedData(recipes.slice(0, visibleItemCount + 3));
  };

  return (
    <>
      <div className="flex justify-center items-center bg-[url(/images/banner_recipes.jpg)] bg-cover bg-center w-full">
        <div>
          <h1 className="font-[Playfair_Display] text-4xl md:text-6xl p-2 font-extrabold bg-gradient-to-r from-black to-orange-400 bg-clip-text text-transparent drop-shadow-lg text-center mt-10">
            Recipe Finder
          </h1>
          <h1 className=" font-[Great_Vibes] md:text-6xl p-2 font-extrabold bg-gradient-to-r from-black to-orange-400 bg-clip-text text-transparent drop-shadow-lg text-center mt-10">
            Find the Tastiest Recipes
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-white to-orange-200">
        <div className="overflow-x-auto bg-white p-10 rounded-lg shadow-lg h-auto w-[1000px]">
          <h3 className="text-center text-5xl font-extrabold mb-8 font-[Playwrite_AU_SA] 
               text-black
               bg-clip-text 
               drop-shadow-md transition-transform duration-300 hover:scale-105 hover:drop-shadow-lg">
            Chef's Picks 
          </h3>
          <div className="flex flex-wrap gap-2 justify-evenly">
            {displayedData.map((value) => (
              <div key={value._id}>
                <Link href={`/RecipeDetails/${value._id}`}>
                  <RecipeCard recipes={value} />
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-5">
          <button
            onClick={handleLoadMore}
            className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full mt-7 p-5"
            >
            Load More
          </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default HomeView;
