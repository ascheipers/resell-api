'use strict';

const { HOST_PORT } = require('./util/settings');

var fs = require('fs'),
    http = require('http'),
    path = require('path');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({
  strict: false
}));
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
const { rejects } = require('assert');

var spec = fs.readFileSync(path.join(__dirname, '../reference/resell.dereferenced.v1.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
  controllers: path.join(__dirname, './controllers'),
  loglevel: 'info',
  strict: false,
  router: true,
  validator: true
};

oasTools.configure(options_object);

app.use('/resell/images', express.static('resell-images'));

module.exports = () => {
  return new Promise((resolve, reject) => {
    oasTools.initialize(oasDoc, app, () => {
      resolve(app);
    });
  });
}
