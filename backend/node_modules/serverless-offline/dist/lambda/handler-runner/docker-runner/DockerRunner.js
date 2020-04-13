"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fsExtra = require("fs-extra");

var _jszip = _interopRequireDefault(require("jszip"));

var _DockerContainer = _interopRequireDefault(require("./DockerContainer.js"));

var _index = require("../../../utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

const {
  keys
} = Object;

class DockerRunner {
  constructor(funOptions, env) {
    Object.defineProperty(this, _container, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _servicePath, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _volumeDir, {
      writable: true,
      value: null
    });
    const {
      // artifact,
      functionKey,
      handler,
      runtime,
      servicePath
    } = funOptions; // this._artifact = artifact

    _classPrivateFieldLooseBase(this, _container)[_container] = new _DockerContainer.default(env, functionKey, handler, runtime);
    _classPrivateFieldLooseBase(this, _servicePath)[_servicePath] = servicePath; // TODO FIXME better to use temp dir? not sure if the .serverless dir is being "packed up"
    // volume directory contains code and layers

    _classPrivateFieldLooseBase(this, _volumeDir)[_volumeDir] = (0, _path.join)(servicePath, '.serverless', 'offline', functionKey, (0, _index.createUniqueId)());
  }

  async cleanup() {
    if (_classPrivateFieldLooseBase(this, _container)[_container]) {
      await _classPrivateFieldLooseBase(this, _container)[_container].stop();
      return (0, _fsExtra.remove)(_classPrivateFieldLooseBase(this, _volumeDir)[_volumeDir]);
    }

    return undefined;
  } // extractArtifact, loosely based on:
  // https://github.com/serverless/serverless/blob/v1.57.0/lib/plugins/aws/invokeLocal/index.js#L312


  async _extractArtifact() {
    if (this._artifact) {
      const codeDir = (0, _path.join)(_classPrivateFieldLooseBase(this, _volumeDir)[_volumeDir], 'code');
      const data = await (0, _fsExtra.readFile)(this._artifact);
      const zip = await _jszip.default.loadAsync(data);
      await Promise.all(keys(zip.files).map(async filename => {
        const fileData = await zip.files[filename].async('nodebuffer');

        if (filename.endsWith(_path.sep)) {
          return Promise.resolve();
        }

        await (0, _fsExtra.ensureDir)((0, _path.join)(codeDir, (0, _path.dirname)(filename)));
        return (0, _fsExtra.writeFile)((0, _path.join)(codeDir, filename), fileData, {
          mode: zip.files[filename].unixPermissions
        });
      }));
      return codeDir;
    }

    return _classPrivateFieldLooseBase(this, _servicePath)[_servicePath];
  } // context will be generated in container


  async run(event) {
    // FIXME TODO this should run only once -> static private
    await (0, _index.checkDockerDaemon)();

    if (!_classPrivateFieldLooseBase(this, _container)[_container].isRunning) {
      const codeDir = await this._extractArtifact();
      await _classPrivateFieldLooseBase(this, _container)[_container].start(codeDir);
    }

    return _classPrivateFieldLooseBase(this, _container)[_container].request(event);
  }

}

exports.default = DockerRunner;

var _container = _classPrivateFieldLooseKey("container");

var _servicePath = _classPrivateFieldLooseKey("servicePath");

var _volumeDir = _classPrivateFieldLooseKey("volumeDir");