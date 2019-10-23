module.exports = {
    pg: {
        logging: process.env.PG__LOGGING ? JSON.parse(process.env.PG__LOGGING) : false,
        uri: process.env.DATABASE_URL,
    },
    app: {
        port: process.env.PORT || 3001,
    },
    firebase: {
        apiKey: process.env.FB_API_KEY,
        authDomain: process.env.FB_AUTH_DOMAIN,
        databaseURL: process.env.FB_DB_URL,
        projectId: process.env.FB_PROJECT_ID,
        appId: process.env.FB_APP_ID,
    }
};
