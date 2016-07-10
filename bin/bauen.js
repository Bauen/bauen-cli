#!/usr/bin/env node

/**
 * @file
 * Defines Bauen command line interface.
 */

// Load dependencies.
const BauenAPI = require('../lib/bauen.api');
const Console = require('../lib/console.api');
const Project = require('../lib/project.api');

// Scaffold out Bauen object.
BauenAPI.prototype.console = new Console();
BauenAPI.prototype.api = {
  project: Project
};

// Create a new instance of the CLI.
const BauenCLI = new BauenAPI();

// Initialize cli, project, and commands.
// Then execute the cli with any given params, and log errors.
BauenCLI
  .initializeCli()
  .then(() => BauenCLI.initializeProject())
  .then(() => BauenCLI.initializeCommands())
  .then(() => BauenCLI.execute())
  .catch((reason) => BauenCLI.console.log(reason, 'error'));
