#!/usr/bin/env node

/**
 * @file
 * Defines Bauen command line interface.
 */

// Load dependencies.
const BauenAPI = require('../lib/bauen.api');
const Console = require('../lib/console.api');

// Scaffold out Bauen object.
BauenAPI.prototype.console = new Console();

// Create a new instance of the CLI.
const Bauen = new BauenAPI();

// Initialize the command line interface properties.
Bauen.initializeCli()

// Initialize the current bauen project.
.then(() => {
  Bauen.initializeProject();
})

// Parse command line input and execute.
.then(() => {
  Bauen.execute();
})

// Catch any errors and surface them to the user.
.catch((reason) => {
  Bauen.console.log(reason, 'error');
});
