const router = require('express').Router()

const recipeController = require('../controllers/recipe-controller')
const userController = require("../controllers/user-controller")
const validateId = require('../middleware/validate-id')
const validateUserData = require("../middleware/user-DataValidation")

//recipe endpoints
router.get('/recipes/', recipeController.findAllRecipes)
router.get('/recipes/search', recipeController.findRecipesByName);
router.get('/recipes/liked', recipeController.findMostLiked);
router.get('/recipes/:id', validateId, recipeController.findRecipeById)
router.post('/recipes/', recipeController.createRecipe)
router.put('/recipes/:id', validateId, recipeController.updateRecipeById)
router.patch('/recipes/:id', validateId, recipeController.updateRecipeLikes)
router.delete('/recipes/:id', validateId, recipeController.deleteRecipeById)

//user endpoints
router.get('/users/', userController.findAllUsers)
router.get('/users/:id', validateId, userController.findUserById)
router.post('/register/', validateUserData, userController.createUser)
router.post('/login', userController.postLogin)



module.exports = router