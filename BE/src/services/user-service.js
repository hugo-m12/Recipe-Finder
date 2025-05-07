const argon2 = require("argon2");
const { ObjectId } = require('mongodb')
const { usersdb } = require('../db/mongodb')
const users = usersdb.collection('employees')

async function findAllUsers() {
	const result = users.find().toArray()
	return result
}

async function findUserById(id) {
	const result = users.findOne({
		_id: new ObjectId(id),
	})
	return result
}


async function createUser(userData) {
    const hashedPassword = await argon2.hash(userData.password);
    
    const result = await users.insertOne({
        email: userData.email,
        password: hashedPassword 
    });

    return {
        result,
        hashedPassword
    };
}

async function userAuth(email, password) {
    const user = await users.findOne({ email: email });

    if (!user) {
        throw new Error('User not found');
    }

    const verified = await argon2.verify(user.password, password);
    
    if (!verified) {
        throw new Error('Invalid password');
    }
    return user;
}


module.exports = {
    findAllUsers,
    createUser,
    findUserById,
	userAuth
}