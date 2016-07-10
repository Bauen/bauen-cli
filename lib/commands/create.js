/**
 * @file
 * Defines 'bauen create' cli command.
 */

// Load dependencies.
const path = require('path');

/**
 * Sets up the create cli command.
 * @param {object} BauenCLI Instance of the bauen cli.
 * @returns {undefined} nothing.
 */
module.exports = (BauenCLI) => {

  BauenCLI.cli.command('create <name')
    .description('Creates a directory and scaffolds an empty Bauen project within.')
    .action((name) => {
      // Create new project instance.
      const dir = path.join(BauenCLI.cwd, name);
      const Project = new BauenCLI.api.project(BauenCLI, dir, name);

      // Create the project.
      Project.create()
        .then(() => BauenCLI.console.log(`${name} created successfully!`, 'success'))
        .catch((reason) => BauenCLI.console.log(reason, 'error'));
    });
}
