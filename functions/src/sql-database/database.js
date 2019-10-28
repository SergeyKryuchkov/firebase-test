'use strict';
require('dotenv').load({path: process.env.DOTENV || '../../.env'});

const debug = require('debug')('lg:database');
const Sequelize = require('sequelize');
const path = require('path');
const klawSync = require('klaw-sync');

const functions = require('firebase-functions');


const dbConfig  = functions.config().sqldatabase;

debug(`Database connection string: ${dbConfig.url}`);
const sequelize = new Sequelize(dbConfig.url, {
    dialect: 'postgres',
    dialectOptions: {
      multipleStatements: true,
    },
    logging: dbConfig.logging ? debug : false,
});

const models = {};

const modelsPaths = klawSync(`${__dirname}/models`, {nodir: true});

modelsPaths.forEach((file) => {
    if (!file.path.match(/\.js$/) || !require(path.resolve(__dirname, file.path))) return;
    const model = sequelize.import(path.resolve(__dirname, file.path));
    models[model.name] = model;
});

Object.keys(models).forEach((name) => {
    if ('associate' in models[name]) {
        models[name].associate(models);
    }
});

debug(`Available models: \n\t* ${Object.keys(models).join('\n\t* ')}`);

module.exports = {sequelize, models};
