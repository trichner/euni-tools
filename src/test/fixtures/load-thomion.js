#!/usr/bin/env node

var sequelizeFixtures = require('sequelize-fixtures');
var models = require('../../models');
var path = require("path");

sequelizeFixtures.loadFile(path.join(__dirname, "thomion.json"), models);