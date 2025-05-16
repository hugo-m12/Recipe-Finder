import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { navigate } from "wouter/use-browser-location";
import recipeService from "../services/recipeService";
import fetchService from "../services/fetchService";
import toast from 'react-hot-toast';

function EditRecipeView() {
  const [recipe, setRecipe] = useState({
    name: "",
    mealType: "",
    directions: "",
    preparationTime: "",
    nutritionalValue: "",
    difficulty: "",
    likeCount: 0,
    ingredients: [""],
  });
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const params = useParams();

  useEffect(function () {
        (async function () {
          const data = await fetchService.get("https://recipe-finder-api-i9z8.onrender.com/admin", true);
          if (!data) {
            window.location = "/login";
          }
        })();
      }, []);

  useEffect(() => {
      const fetchRecipeData = async () => {
        try {
          const recipe = await recipeService.getRecipeById(params._id);
    
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? null : Number(value);
    setRecipe((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

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
      await recipeService.updateRecipeById(params._id, recipe);

      toast.success("Recipe was updated successfully!", {
        duration: 3000,
        position: 'top-center'
      });

    } catch (error) {
      setError(error.message || "Failed to update recipe");

      toast.error(error, {
        duration: 3000,
        position: 'top-center'
      });

    } finally {
      setLoading(false);
    }
  };

  if (!params._id) {
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Recipe not Found!
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-gray-700 mt-10 mb-4">
        Edit Recipe
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
      >
        <div className="space-y-4">
          <label>Name</label>
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

          <label>Like Count</label> 
          <input 
          name="likeCount"
          type="number"
          value={recipe.likeCount}
          onChange={handleNumberChange}
          className="w-full h-10 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Like Count"
          />

<div className="space-y-4">
          <h3 className="text-lg font-medium">Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                required
                type="text"
                name={`ingredients-${index}`}
                value={ingredient}
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
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
      <div className="mb-[27px]"></div>
    </>
  );
}

export default EditRecipeView;
