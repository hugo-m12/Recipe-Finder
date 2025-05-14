import React, { useState } from "react";
import { Link } from "wouter";
import recipeService from "../services/recipeService";
import { navigate } from "wouter/use-browser-location";
import toast from 'react-hot-toast';

function Header({ isAuthenticated, onLogout }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState ("");

  const handleLogout = () => {
    if (onLogout) onLogout();
    toast.success("User has logged out", {
      duration: 3000,
      position: 'top-center'
    });
    navigate("/");
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      const results = await recipeService.searchRecipeByName(searchTerm)
      setRecipes(results);
      setSuccessMessage(`${results.length} Recipes found!`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (err) {
      setRecipes([]);
      setError(err.message || "No recipes found");
    } finally {
      setLoading(false);
    }
  };
  const handleIngredientSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const results = await recipeService.searchRecipeByIngredient(searchTerm)
      setRecipes(results);
      setSuccessMessage(`${results.length} Recipes found!`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (err) {
      setRecipes([]);
      setError(err.message || "No recipes found");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <>
      <header className="text-center">
        <div className="text-white bg-cover bg-center">
          <nav className="hidden md:flex justify-center gap-16 p-7 list-none">
            <li>
              <Link
                className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <div>
                <button
                  onClick={() => {
                  setIsOpen(!isOpen);
                  setRecipes([]);
                  setSearchTerm("");
                }}
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                  aria-expanded={isOpen}
                  aria-label="Toggle search bar"
                >
                  Search
                </button>

                {isOpen && (
                  <div
                    id="search-menu"
                    className="flex flex-col items-center justify-center p-5 space-y-4"
                  >
                    <div className="flex justify-center gap-6 mt-10">
                      <form onSubmit={handleNameSubmit}>
                        <div className="flex mb-3">
                          <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg bg-white p-5">
                            <svg
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              className="pointer-events-none absolute w-5 fill-gray-500 transition"
                            >
                              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
                            </svg>
                          </div>

                          <input
                            name="name"
                            type="text"
                            value={searchTerm.name}
                            onChange={handleChange}
                            className="peer w-full py-3 pl-12 pr-4 text-gray-900 rounded-tl-lg rounded-bl-lg bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Search Recipes..."
                          />

                          <button
                            type="submit"
                            className="bg-orange-300 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-orange-400 transition-colors"
                            disabled={loading}
                          >
                            {loading ? "Searching..." : "Search"}
                          </button>
                        </div>
                      </form>
                    
                      <form onSubmit={handleIngredientSubmit}>
                        <div className="flex">
                          <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg bg-white p-5">
                            <svg
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              className="pointer-events-none absolute w-5 fill-gray-500 transition"
                            >
                              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
                            </svg>
                          </div>

                          <input
                            name="ingredients"
                            type="text"
                            value={searchTerm.ingredients}
                            onChange={handleChange}
                            className="peer w-full py-3 pl-12 pr-4 rounded-tl-lg rounded-bl-lg text-gray-900 bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Search Ingredients..."
                          />

                          <button
                            type="submit"
                            className="bg-orange-300 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-orange-400 transition-colors"
                            disabled={loading}
                          >
                            {loading ? "Searching..." : "Search"}
                          </button>
                        </div>
                      </form>
                    </div>

                    <table className="table-auto w-full text-center border-collapse border border-gray-300 rounded-lg mt-4">
                      <tbody>
                        {recipes.map((recipe) => (
                          <tr
                            key={recipe._id}
                            className="hover:bg-gray-200 cursor-pointer"
                          >
                            <td className="py-3 px-4 text-black border-b border-gray-300">
                              <Link onClick={() => setIsOpen(!isOpen)} href={`/RecipeDetails/${recipe._id}`}>
                                <div>{recipe.name}</div>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {error && <div className="mt-2 text-red-500">{error}</div>}
                    {successMessage && (
                      <div className="mt-2 text-green-500">
                        {successMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2 cursor-pointer"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    href="/AdminView"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2 cursor-pointer"
                  >
                    Admin Panel
                  </Link>
                </li>
              </>
            ) : (
            <>
              <li> 
              <Link
                className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                href="/Register"
              >
                Register
              </Link>
            </li>

              <li>
                <Link
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                  href="/Login"
                >
                  Login
                </Link>
              </li>
            </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
