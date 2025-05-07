const recipeService = require('../services/recipe-service')

async function findAllRecipes(req, res) {
	const result = await recipeService.findAllRecipes()
	res.json(result)
}

async function findRecipesByName(req, res) {
    try {

        const result = await recipeService.findRecipesByName(
            req.query.name,
            req.query.ingredients
        );

        return res.json(result);
    } catch (error) {
        console.error('Error finding recipes:', error);
        
        return res.status(500).json({
            error: 'Failed to find recipes',
            message: error.message
        });
    }
}

async function findMostLiked(req, res) {
	const result = await recipeService.findMostLiked()
	res.json(result)
}

async function findRecipeById(req, res) {
	const id = req.params.id

	const result = await recipeService.findRecipeById(id)

	if (result) {
		res.json(result)
	} else {
		res.status(404).end()
	}
}

async function createRecipe(req, res) {
	const recipeData = req.body

	const result = await recipeService.createRecipe(recipeData)

	if (result) {
		res.json('Recipe Created')
	} else {
		res.status(404).end()
	}
}

async function updateRecipeById(req, res) {
	const id = req.params.id
	const recipeData = req.body

	const result = await recipeService.updateRecipeById(id, recipeData)

	if (result) {
		res.json('Recipe Updated')
	} else {
		res.status(404).end()
	}
}

async function deleteRecipeById(req, res) {
	const id = req.params.id

	const result = await recipeService.deleteRecipeById(id)

	if (result.deletedCount == 1) {
		res.json('Recipe Deleted')
	} else {
		res.status(404).end()
	}
}

async function updateRecipeLikes(req, res){
	try {
	  const id = req.params.id;
	  const result = await recipeService.updateRecipeLikes(
		id,
		{ 
		  likeCount: req.body.likeCount 
		},
		{ 
		  new: true 
		}
	  );
	  
	  if (!result) {
		return res.status(404).json({ 
		  error: 'Recipe not found' 
		});
	  }
	  
	  res.json(result);
	} catch (res) {
	  res.status(500).json({ 
		error: 'Failed to update recipe' 
	  });
	}
  };

module.exports = {
	findAllRecipes,
	findRecipesByName,
    findRecipeById,
	deleteRecipeById,
	createRecipe, 
	updateRecipeById,
	findMostLiked,
	updateRecipeLikes
}