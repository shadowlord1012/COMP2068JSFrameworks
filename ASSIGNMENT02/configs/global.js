require("dotenv").config();

const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
        WeatherAPI: process.env.WEATHER_API_KEY
    },
    Authentication: {
        GitHub: {
            ClientID: process.env.GITHUB_CLIENT_ID,
            ClientSecret: process.env.GITHUB_CLIENT_SECRET,
            CallbackURL: process.env.GITHUB_CALLBACK_URL,
        }
    }
}

module.exports = configurations;