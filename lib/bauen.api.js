/**
 * @file
 * Contains the main Bauen class.
 * ______
 * | ___ \
 * | |_/ / __ _ _   _  ___ _ __
 * | ___ \/ _` | | | |/ _ \ '_ \
 * | |_/ / (_| | |_| |  __/ | | |
 * \____/ \__,_|\__,_|\___|_| |_|
 */

// Load dependencies.
const fs = require('fs-extra');
const commander = require('commander');

/**
 * @class
 * @classdesc Constructs the main Bauen class.
 */
class Bauen {

  /**
   * Constructs class properties.
   */
  constructor() {
    this.version = '0.0.1';
    this.cli = commander;
    this.cwd = process.cwd();
    this.initialize = false;
    this.root = false;
    this.art = [
      '______',
      '| ___ \\',
      '| |_/ / __ _ _   _  ___ _ __',
      '| ___ \\/ _` | | | |/ _ \\ \\\'_ \\',
      '| |_/ / (_| | |_| |  __/ | | |',
      '\\____/ \\__,_|\\__,_|\\___|_| |_|',
    ].join('\n');
  }

  /**
   * Initializes CLI.
   * @returns {object} promise object.
   */
  initializeCli() {
    return new Promise((resolve) => {
      this.cli
      .version(this.version)
      .usage('command [options]');
      this.cli._name = 'bauen';
      resolve();
    });
  }

  /**
   * Initializes the project in the current directory, if there is one.
   * @returns {object} promise object.
   */
  initializeProject() {
    return new Promise((resolve, reject) => {
      if (!this.hasOwnProperty('cwd') || !this.cwd) {
        reject('Unknown current working directory.');
        return;
      }

      // Find the bauen root in the current directory tree.
      let dir = this.cwd;
      while (this.root === false && dir.length > 0) {
        if (fs.existsSync(`${dir}/bauen.json`)) {
          this.root = dir;
        }
        else {
          dir = dir.substring(0, dir.lastIndexOf('/'));
        }
      }

      resolve();
    });
  }

  /**
   * Parses current input and executes Bauen.
   * @returns {object} promise object.
   */
  execute() {
    return new Promise((resolve) => {
      // If no arguments passed in, output cli docs.
      const command = process.argv.slice(2);

      // If command is empty, show help message.
      if (!command.length) {
        this.console.log(`${this.art} \n`, 'success');
        this.cli.outputHelp();
      }

      // Parse input and execute.
      else {
        this.cli.parse(process.argv);
      }

      resolve();
    });
  }
}

module.exports = Bauen;
