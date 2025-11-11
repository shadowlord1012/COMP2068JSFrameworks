//import dotenv to read .env file
require('dotenv').config();

//This is my configuration file
const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },
    Authenthication: {
        GitHub: {
            ClientID: process.env.GITHUB_CLIENT_ID,
            ClientSecret: process.env.GITHUB_CLIENT_SECRET
        }
    },
    ClientServer: {
        Server: process.env.CLIENT_SERVER,
    }
}

//exports the object
module.exports = configurations