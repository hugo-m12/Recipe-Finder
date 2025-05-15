import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { navigate } from "wouter/use-browser-location";
import recipeService from "../services/recipeService";

function EditRecipeView() {
  const [recipe, setRecipe] = useState({
    name: "",
    mealType: "",
    directions: "",
    preparationTime: "",
    nutritionalValue: "",
    difficulty: "",
    ingredients: [""],
  });
  const [, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(recipe.likeCount || 0);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [visibleItemCount,] = useState(3);
  const params = useParams();

  useEffect(() => {
    setLikeCount(recipe.likeCount || 0);
  }, [recipe.likeCount]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipe = await recipeService.getRecipeById(params._id);
        window.scrollTo(0,0)
        if (!recipe || recipe._id.toString() !== params._id.toString()) {
          navigate("/404");
          return;
        }
  
        setRecipe(recipe);
      } catch (error) {
        setError(error.message || "Failed to fetch recipe");
        navigate("/404");
      }
    };
  
    if (params._id) {
      fetchRecipeData();
    }
  }, [params._id]);
  
  useEffect(() => {
    const fetchOtherRecipes = async () => {
      try {
        const data = await recipeService.getAllRecipes(params._id);
        setOtherRecipes(data);


        const displayedItems = [...data];
        for (let i = displayedItems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [displayedItems[i], displayedItems[j]] = [displayedItems[j], displayedItems[i]];
        }
        
        setDisplayedData(displayedItems.slice(3, visibleItemCount + 3));

      } catch (error) {
        setError(error.message || "Failed to fetch recipe");
      }
    };
    if (params._id) {
      fetchOtherRecipes();
    }
  }, [params._id, recipe, visibleItemCount]);

  if (!params._id) {
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Recipe not Found!
      </div>
    );
  }



  const handleLikeButton = async () => {
    try {
      const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/${params._id}`);
      const recipe = await response.json();
      
      const currentCount = recipe.likeCount ?? 0;
      setLikeCount(currentCount);
      
      const newCount = currentCount + 1;
      setLikeCount(newCount);
      
      const patchResponse = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/${params._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likeCount: newCount
        })
      });
  
      if (!patchResponse.ok) {
        throw new Error('Failed to update recipe');
      }
  
      await patchResponse.json();
    } catch (error) {
      setLikeCount(prev => prev - 1);
      console.error('Error updating like:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
 <div className="flex justify-center items-center mt-5">
  <div className="flex items-center">
    <h1 className="font-[Playfair_Display] text-5xl font-semibold mr-4 text-gray-700">{recipe.name}</h1>
    <button
      onClick={handleLikeButton}
      className="text-red-500 text-3xl hover:text-red-700 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path
          fillRule="evenodd"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
             4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
             14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
             3.78-3.4 6.86-8.55 11.54L12 21.35z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    <input
      className="text-xl font-semibold bg-transparent border-none p-0 cursor-default w-12 text-center"
      type="text"
      value={likeCount}
      onChange={handleChange}
      readOnly
    />
  </div>
</div>
      <div className=" font-[Signika_Negative] text-lg max-w-2xl mx-auto p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label>
                Meal Type: 
                <span className="text-sm text-gray-700"> {recipe.mealType}</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label>
                Preparation Time: 
                <span className="text-sm text-gray-700"> {recipe.preparationTime}</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label>
                Nutritional Value: 
                <span className="text-sm text-gray-700"> {recipe.nutritionalValue}</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label>
                Difficulty: 
                <span className="text-sm text-gray-700"> {recipe.difficulty}</span>
              </label>
            </div>
          </div>

          <hr className="border-gray-200" />
          <div>
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <div className="h-[150px] overflow-y-auto rounded-md border p-4">
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {ingredient}
                    </span>
                  ))
                ) : (
                  <p>none</p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-lg font-semibold mb-3">Directions</h3>
            <div className="h-[200px] overflow-y-auto rounded-md border p-4">
              <p className="whitespace-pre-wrap">{recipe.directions}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 mb-10 cursor-pointer">
        <h2 className="text-4xl text-center font-semibold text-gray-700 mb-4"> Other Recipes </h2>
        
        {otherRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayedData.map(recipe => (
              <div key={recipe._id} className="border rounded-md border-orange-400 shadow-sm transition-all duration-300 hover:border-[#fa8503] hover:shadow-lg hover:bg-white bg-gray-100">
              <Link href={`/RecipeDetails/${recipe._id}`}>
                <div className="p-4">
                  <h3 className="font-[Signika_Negative] font-bold text-xl">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {recipe.mealType} • {recipe.preparationTime}
                  </p>
                </div>
              </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No similar recipes found</p>
        )}
      </div>

    </>
  );
}

export default EditRecipeView;
