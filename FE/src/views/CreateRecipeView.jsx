import React from "react";
import { useState, useEffect } from "react";
import recipeService from "../services/recipeService";
import fetchService from "../services/fetchService";
import toast from 'react-hot-toast';

function AddRecipeView() {
  const url = "https://recipe-finder-api-i9z8.onrender.com";
  const [recipe, setRecipe] = useState({
    name: "",
    mealType: "",
    directions: "",
    preparationTime: "",
    nutritionalValue: "",
    difficulty: "",
    likeCount: 0,
    ingredients: [""],
    thumbnail: "/images/thumbnails/recipe.jpg",
  });
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(function () {
      (async function () {
        const data = await fetchService.get(`${url}/admin`, true);
        if (!data) {
          window.location = "/login";
        }
      })();
    }, []);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = e.target.value;
    setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const handleAddIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const handleRemoveIngredient = (index) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await recipeService.createRecipe(recipe);
      setRecipe({
        name: "",
        mealType: "",
        directions: "",
        preparationTime: "",
        nutritionalValue: "",
        difficulty: "",
        likeCount: 0,
        ingredients: [""],
        thumbnail: "/images/thumbnails/recipe.jpg",
      });

      toast.success("Recipe was created", {
        duration: 3000,
        position: 'top-center'
      });


    } catch (error) {
      setError(error.message || "Failed to create recipe");

      toast.error(error, {
        duration: 3000,
        position: 'top-center'
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-gray-700 mt-10 mb-4">
        Create Recipe
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
        <div className="space-y-4">
          <label className="text-left">Name</label>
          <input
            required
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Recipe Name"
            />
          <label>Meal Type</label>
          <input
            required
            name="mealType"
            value={recipe.mealType}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Meal Type"
            />
          <label>Preparation Time</label>
          <input
            required
            name="preparationTime"
            value={recipe.preparationTime}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Preparation Time"
            />
          <label>Nutritional Value</label>
          <input
            required
            name="nutritionalValue"
            value={recipe.nutritionalValue}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nutritional Value"
            />
          <label>Difficulty</label>
          <input
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Difficulty"
            />
          <div className="space-y-4">
          <h3 className="text-lg font-medium">Ingredients</h3> 
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name={`ingredients-${index}`}
                value={ingredient}
                required
                onChange={(e) => handleIngredientChange(index, e)}
                className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Ingredient ${index + 1}`}
                />
              {recipe.ingredients.length > 1 && (
                <button
                onClick={() => handleRemoveIngredient(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddIngredient}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
            Add Ingredient
          </button>
        </div> 
        <label>Directions</label>
          <textarea
            required
            name="directions"
            value={recipe.directions}
            onChange={handleChange}
            className="px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full h-40"
            placeholder="Cooking Directions"
            />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
            >
            {loading ? (
              <span className="flex justify-center items-center">
                Creating...
              </span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
  <div className="mb-[143px]"></div>
  </>
  );
}

export default AddRecipeView;
