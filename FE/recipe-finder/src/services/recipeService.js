async function getAllRecipes() { 
    try {
        const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes`);
        const result = await response.json();
        return(result);

    } catch (error) {
        console.error("Error fetching all recipes:" + error); 
        return [];
    }
  }

  async function getLikedRecipes() {
    try {
      const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/liked`);
      const result = await response.json();
      return(result);

  } catch (error) {
      console.error("Error fetching liked recipes:" + error); 
      return [];
  }
  }

  async function searchRecipeByName(name) {
    try {
        const params = new URLSearchParams();
        if (name) params.append('name', name);

        const url = `https://recipe-finder-api-i9z8.onrender.com/api/recipes/search?${params.toString()}`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
}

async function searchRecipeByIngredient (ingredients) {
  try {
      const params = new URLSearchParams();
      if (ingredients) params.append('ingredients', ingredients);

      const url = `https://recipe-finder-api-i9z8.onrender.com/api/recipes/search?${params.toString()}`;

      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error("Error fetching recipe:", error);
      throw error;
  }
}

  async function getRecipeById(id) { 
    try {
        const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/${id}`);
        const result = await response.json();
        return(result);

    } catch (error) {
        console.error("Error fetching recipe " + error); 
        return [];
    }
  }

  async function createRecipe(data) {
    try {
      const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error Creating recipe:", error);
      throw error; 
    }
  }

  async function updateRecipeById(id, data) {
    try {
      const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error Updating recipe:", error);
      throw error; 
    }
  }

  async function deleteRecipeById(id) {
    try {
      const response = await fetch(`https://recipe-finder-api-i9z8.onrender.com/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error; 
    }
  }

  export default {
    getAllRecipes,
    getRecipeById,
    updateRecipeById,
    createRecipe,
    deleteRecipeById, 
    searchRecipeByIngredient,
    getLikedRecipes,
    searchRecipeByName
}