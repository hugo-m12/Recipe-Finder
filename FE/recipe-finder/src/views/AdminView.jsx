import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "wouter";
import { useConfirm } from "material-ui-confirm";
import recipeService from "../services/recipeService";
import fetchService from "../services/fetchService";
import toast from "react-hot-toast";

function AdminView() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const confirm = useConfirm();
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 10;

  const indexOfLastRecipe = (currentPage + 1) * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  useEffect(function () {
    (async function () {
      const data = await fetchService.get("https://recipe-finder-api-i9z8.onrender.com/admin", true);
      if (!data) {
        window.location = "/login";
      }
    })();
  }, []);

  useEffect(function () {
    (async function () {
      const result = await recipeService.getAllRecipes();
      setRecipes(result);
    })();
  }, []);

  async function handleDelete(id) {
    try {
      const { confirmed, reason } = await confirm({
        title: "Are you sure you want to delete this Recipe?",
        description: "This will delete this recipe permanently",
      });

      if (confirmed) {
        setLoading(true);
        await recipeService.deleteRecipeById(id);

        toast.success("Recipe was deleted", {
          duration: 3000,
          position: "top-center",
        });

        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== id)
        );
      } else reason;
    } catch (error) {
      if (error?.message !== "cancel") {
        setError(error.message || "Failed to delete recipe");
      }
    } finally {
      setLoading(false);
    }
  }

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-sky-200 to-blue-400">
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl m-4">
          <h3 className="text-center text-4xl font-bold mb-5">Welcome Admin</h3>
          <div className="flex justify-end">
            <Link
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full justify-end mb-3"
              href="/CreateRecipe"
            >
              Add a new recipe
            </Link>
          </div>
          <table className="table-auto w-full text-center border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">Name</th>
                <th className="py-3 px-4 border-b border-gray-300">
                  Meal Type
                </th>
                <th className="py-3 px-4 border-b border-gray-300">
                  Directions
                </th>
                <th className="py-3 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecipes.map((recipe) => (
                <tr className="hover:bg-gray-200" key={recipe._id}>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {recipe.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {recipe.mealType}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {recipe.directions}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex gap-4 justify-center">
                      <Link
                        href={`/EditRecipe/${recipe._id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(recipe._id)}
                        className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Remove"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(totalPages).keys()].map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                className={`py-1 px-3 rounded-full font-semibold ${
                  currentPage === pageIndex
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminView;
