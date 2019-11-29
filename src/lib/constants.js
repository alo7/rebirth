const os = require('os');
const path = require('path');
const isDocker = require('is-docker');

const CONTENT_TYPE_JSON = {'Content-Type': 'application/json'};
const CONTENT_TYPE_TEXT = {'Content-Type': 'text/plain'};

const PROJECT_DIR = isDocker() ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..', '..');
const LOG_DIR = path.join(PROJECT_DIR, 'logs');
const EXTENSIONS_DIR = isDocker() ? path.join(PROJECT_DIR, 'extensions_dist') : path.join(PROJECT_DIR, 'src', 'extensions_dist');
const HOOKS_DIR = isDocker() ? path.join(PROJECT_DIR, 'hooks') : path.join(PROJECT_DIR, 'src', 'hooks');
const HOOK_MAIN_JS_FILEPATH = path.join(HOOKS_DIR, 'index.js');

const MAX_RECORD_TIME = Number(process.env.MAX_RECORD_TIME) || 7200000;

const MATERIAL_URL = process.env.MATERIAL_URL;

const IS_MAC = os.type() === 'Darwin';

const CHROME_PATH_MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHROME_PATH_LINUX = '/usr/bin/google-chrome-stable';
const CHROME_PATH = IS_MAC ? CHROME_PATH_MAC : CHROME_PATH_LINUX;

const USER_DATA_DIR_MAC = '/tmp/rebirth';
const USER_DATA_DIR_LINUX = '/root/test';
const USER_DATA_DIR = IS_MAC ? USER_DATA_DIR_MAC : USER_DATA_DIR_LINUX;

module.exports.CONTENT_TYPE_JSON = CONTENT_TYPE_JSON;
module.exports.CONTENT_TYPE_TEXT = CONTENT_TYPE_TEXT;
module.exports.PROJECT_DIR = PROJECT_DIR;
module.exports.LOG_DIR = LOG_DIR;
module.exports.EXTENSIONS_DIR = EXTENSIONS_DIR;
module.exports.HOOKS_DIR = HOOKS_DIR;
module.exports.HOOK_MAIN_JS_FILEPATH = HOOK_MAIN_JS_FILEPATH;
module.exports.MAX_RECORD_TIME = MAX_RECORD_TIME;
module.exports.MATERIAL_URL = MATERIAL_URL;
module.exports.IS_MAC = IS_MAC;
module.exports.CHROME_PATH_MAC = CHROME_PATH_MAC;
module.exports.CHROME_PATH_LINUX = CHROME_PATH_LINUX;
module.exports.CHROME_PATH = CHROME_PATH;
module.exports.USER_DATA_DIR_MAC = USER_DATA_DIR_MAC;
module.exports.USER_DATA_DIR_LINUX = USER_DATA_DIR_LINUX;
module.exports.USER_DATA_DIR = USER_DATA_DIR;


