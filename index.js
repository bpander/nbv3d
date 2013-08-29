/**
 * This is the equivalent of what the client-side js does.
 *   1. Load requirejs
 *   2. Load the config file
 *   3. Run the appropriate `main` file by executing `config`.
 *
 * The only difference is the server runs main.server.js and the browser runs main.client.js
 */
var requirejs = require('requirejs');
var config = require('./scripts/require-config');

config(requirejs);