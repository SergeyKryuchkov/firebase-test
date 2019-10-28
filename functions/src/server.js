process.env['NODE_CONFIG_DIR'] = __dirname + '/../config/';

const config = require('config');
const cors = require('cors');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const klawSync = require('klaw-sync');
const path = require('path');

const database = require('./sql-database/database');


/* globals */
app.set('models', database.models);
app.set('sequelize', database.sequelize);

/* configure logger */
configureLogger();

/* set CORS */
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.info(`${new Date()}: [${req.method}] ${req.url}`);
    console.log(1);
    next();
});

useControllers();

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: {
            name: err.name,
            message: err.message,
        },
    });
    next();
});

/**
 *
 */
async function useControllers() {
    const paths = klawSync(`${__dirname}/controllers`, {nodir: true});
    let controllersCount = 0;
    paths.forEach((file) => {
        if (path.basename(file.path)[0] === '_' || path.basename(file.path)[0] === '.') return;
        app.use('/', require(file.path));
        controllersCount++;
    });

    console.info(`Total controllers: ${controllersCount}`);
};

function configureLogger() {
    process.on('uncaughtException', function (err) {
        console.error('uncaughtException', err);
    });
    process.on('uncaughtRejection', function (err) {
        console.error('uncaughtRejection', err);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('unhandledRejection', reason);
    });
    console.info(`Logging settings: ${process.env.DEBUG}`);
}

module.exports = functions.https.onRequest(app);
