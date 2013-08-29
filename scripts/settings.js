var SETTINGS = this.SETTINGS = {};

SETTINGS.GAME_SERVER_ADDRESS = 'http://192.168.1.133';

if (typeof module !== 'undefined') {
    module.exports = SETTINGS;
}