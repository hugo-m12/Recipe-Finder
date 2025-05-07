const dotenv = require ('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const url = process.env.MONGODB_URL

const client = new MongoClient(url)
const recipesdb = client.db('recipes_db')
const usersdb = client.db('employees_db')


module.exports = {
    recipesdb,
    usersdb
};
    
    

