"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pQueue = _interopRequireDefault(require("p-queue"));

var _portfinder = require("portfinder");

var _index = require("../../../config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class DockerPort {
  async get() {
    return _classPrivateFieldLooseBase(DockerPort, _queue)[_queue].add(async () => {
      const port = await (0, _portfinder.getPortPromise)({
        port: _classPrivateFieldLooseBase(DockerPort, _portScanStart)[_portScanStart]
      });
      _classPrivateFieldLooseBase(DockerPort, _portScanStart)[_portScanStart] = port + 1;
      return port;
    });
  }

}

exports.default = DockerPort;

var _queue = _classPrivateFieldLooseKey("queue");

var _portScanStart = _classPrivateFieldLooseKey("portScanStart");

Object.defineProperty(DockerPort, _queue, {
  writable: true,
  value: new _pQueue.default({
    concurrency: 1
  })
});
Object.defineProperty(DockerPort, _portScanStart, {
  writable: true,
  value: _index.DEFAULT_DOCKER_CONTAINER_PORT
});