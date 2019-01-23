const fs = require('fs');
const path = require('path');
const lodashDefaultsDeep = require('lodash/defaultsDeep');

function loadFile(self, filepath) {
  let file;

  try {
    // eslint-disable-next-line
    file = require(filepath);
  } catch (e) {
    throw new Error(`Configuration file (${filepath}) not found!`);
  }

  return file;
}

/**
 * Slim Service Configuration.
 */
const SSConf = function SSConf() {
  const FILE_CONF = 'ss-conf.json';
  const FILE_PACK = 'ss-pack.json';

  // search for configuration json file
  let conf = {};

  if (fs.existsSync(path.resolve(FILE_CONF))) {
    const json = fs.readFileSync(path.resolve(FILE_CONF));
    conf = JSON.parse(json.toString('utf8'));
  } else if (fs.existsSync(path.resolve(FILE_PACK))) {
    const json = fs.readFileSync(path.resolve(FILE_PACK));
    ({ conf } = JSON.parse(json.toString('utf8')));
  }

  // set service configuration
  this.config = {};
  this.config.directory = conf.directory || './config';
  this.config.default = conf.default || 'development';
  this.config.file = {};
  this.config.file.common = (conf.file && conf.file.common) || 'common';
  this.config.file.env = (conf.file && conf.file.env) || {
    development: 'development',
    test: 'test',
    production: 'production',
  };
};

SSConf.prototype.init = function init() {
  const NODE_ENV = (process.env.NODE_ENV && process.env.NODE_ENV.trim()) || this.config.default;

  let env;
  for (let i = 0, keys = Object.keys(this.config.file.env); i < keys.length; i += 1) {
    if (keys[i] === NODE_ENV) {
      env = this.config.file.env[keys[i]];
      break;
    }
  }

  if (!env) {
    throw new Error(`Configuration environment (${NODE_ENV}) not found!`);
  }

  let confDirectory;
  confDirectory = path.resolve(this.config.directory);
  confDirectory = path.relative(__dirname, confDirectory);
  confDirectory = confDirectory.split('\\').join('/');
  confDirectory = `./${confDirectory}/`;

  const fileCommon = loadFile(this, confDirectory + this.config.file.common);
  const fileEnv = loadFile(this, confDirectory + env);

  this.data = lodashDefaultsDeep(fileEnv, fileCommon, {});
};

SSConf.prototype.expose = function expose(name) {
  if (name) {
    if (name.indexOf('.') === -1) {
      return this.data[name];
    }

    let { data } = this;
    for (let i = 0, names = name.split('.'); i < names.length; i += 1) {
      if ({}.propertyIsEnumerable.call(data, names[i])) {
        data = data[names[i]];
      } else {
        return undefined;
      }
    }

    return data;
  }

  return this.data;
};

module.exports = (name) => {
  if (!SSConf.instance) {
    SSConf.instance = new SSConf();
    SSConf.instance.init();
  }

  return SSConf.instance.expose(name);
};
