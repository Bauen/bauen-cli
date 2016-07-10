/**
 * @file
 * Contains the project class.
 */

// Require dependencies.
const path = require('path');
const fs = require('fs-extra');
const json = require('jsonfile');
const _ = require('lodash');

/**
 * Constructs Bauen project API.
 *
 * @class
 * @classdesc Bauen project API.
 */
class Project {

  /**
   * Scaffolds out project properties.
   * @param {object} BauenCLI Instance of the bauen cli.
   * @param {string} directory Directory in which this project resides.
   * @param {string} name Name of this project.
   */
  constructor(BauenCLI, directory, name) {
    this.bauen = BauenCLI;
    this.directory = directory;
    this.name = name;
    this.config = {};
    this.blocks = {};
    this.srcDir = path.join(path.dirname(fs.realpathSync(__filename)), '../src');
    this.initialize();
  }

  /**
   * Initializes this project.
   * @returns {object} promise object.
   */
  initialize() {
    // If this project is already initialized, scaffold out properties
    // from the config files in the project.
    if (this.bauen.initialized) {
      this.config = json.readFileSync(path.join(this.directory, 'bauen.json'));
    }

    // If this project is not initialized, scaffold out properties from the
    // template source directories so that this project can be created.
    else {
      this.config = json.readFileSync(path.join(this.srcDir, 'tpl', 'bauen.json'));
    }

    return Promise.resolve();
  }

  /**
   * Creates this project if it doesn't exist.
   * @returns {object} promise object.
   */
  create() {
    return new Promise((resolve, reject) => {
      // If this project directory already exists, reject.
      if (this.initialized) {
        return reject(`${this.directory} already exists.`);
      }

      // Create main project directories.
      fs.mkdirSync(this.directory);
      fs.mkdirSync(path.join(this.directory, 'blocks'));

      // Create bauen.json file.
      this.updateJson(this.config);
      resolve();
    });
  }

  /**
   * Updates this project's bauen.json file.
   *
   * @param {object} updatedJson json that should be merged with project json.
   * @returns {object} promise object.
   */
  updateJson(updatedJson) {
    return new Promise((resolve, reject) => {
      if (updatedJson) {
        this.config = _.extend(this.config, updatedJson);
        json.writeFileSync(path.join(this.directory, 'bauen.json'), this.config, {spaces: 2});
      }

      resolve();
    })
  }
}

module.exports = Project;
