const { ObjectId } = require("mongodb");
const { recipesdb } = require("../db/mongodb");
const recipes = recipesdb.collection("recipes");

async function findAllRecipes() {
  const result = recipes.find().toArray();
  return result;
}

async function findRecipesByName(name, ingredients) {
    try {
        const query = {};
        
        if (!name && !ingredients) {
            return await recipes.find({}).toArray();
        }
        
        query.$or = [];
        

        if (name) {
            query.$or.push({ name: { $regex: new RegExp(name, "i") } });
        }

        if (ingredients) {
            query.$or.push({ ingredients: { $regex: new RegExp(ingredients, "i") } });
        }
        
        const result = await recipes
            .find(query)
            .toArray();
            
        return result;
    } catch (error) {
        console.error('Error finding recipes:', error);
        throw error;
    }
}


async function findMostLiked() {
  const result = await recipes.find({})
      .sort({ likeCount: -1 })
      .toArray();
  return result;
}

async function findRecipeById(id) {
  const result = recipes.findOne({
    _id: new ObjectId(id),
  });
  return result;
}

async function createRecipe(recipeData) {
  const result = await recipes.insertOne({
    name: recipeData.name,
    mealType: recipeData.mealType,
    difficulty: recipeData.difficulty,
    directions: recipeData.directions,
    preparationTime: recipeData.preparationTime,
    nutritionalValue: recipeData.nutritionalValue,
    likeCount: recipeData.likeCount,
    ingredients: Array.isArray(recipeData.ingredients)
      ? recipeData.ingredients
      : [recipeData.ingredients],
    thumbnail: recipeData.thumbnail,
  });
  return result;
}

async function updateRecipeById(id, recipeData) {
  const filter = { _id: new ObjectId(id) };
  const result = recipes.updateOne(filter, {
    $set: {
      name: recipeData.name,
      mealType: recipeData.mealType,
      difficulty: recipeData.difficulty,
      directions: recipeData.directions,
      preparationTime: recipeData.preparationTime,
      nutritionalValue: recipeData.nutritionalValue,
      likeCount: recipeData.likeCount,
      ingredients: Array.isArray(recipeData.ingredients)
        ? recipeData.ingredients
        : [recipeData.ingredients],
      thumbnail: recipeData.thumbnail,
    },
  });

  return result;
}

async function deleteRecipeById(id) {
  const result = recipes.deleteOne({
    _id: new ObjectId(id),
  });
  return result;
}

async function updateRecipeLikes(id, recipeData) {
  const filter = { _id: new ObjectId(id) };
  const result = recipes.updateOne(filter, {
    $set: {
      likeCount: recipeData.likeCount,
    },
  });

  return result;
}

module.exports = {
  findAllRecipes,
  findRecipesByName,
  findRecipeById,
  deleteRecipeById,
  createRecipe,
  updateRecipeById,
  updateRecipeLikes,
  findMostLiked
};
