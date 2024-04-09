const Client = require("../models/Client")

const getAllClients = async (query = {}) => {
    try {
        // Use await to asynchronously fetch clients from the database based on the query
        const clients = await Client.find(query);

        // Return the array of clients that match the specified query
        return clients;
    } catch (err) {
        // Throw an error if fetching clients fails
        throw new Error("Couldn't fetch the clients");
    }
}

const addClient = async (email,password) => {
     // Check if a user with the same username or email already exists
     const existingUser = await Client.findOne({"email":email});

     if (existingUser) {
         throw new Error('Username or email already exists');
     }
    const newClient = new Client({
        "password":password,
        "email": email
        });
        newClient.save()
    .then(() => {
        console.log('User created successfully');
    })
    .catch((err) => {
        console.error('Error creating user:', err);
    });
}

module.exports = {
    getAllClients,
    addClient
}