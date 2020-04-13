"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _os = require("os");

var _path = require("path");

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

const {
  parse,
  stringify
} = JSON;
const {
  cwd
} = process;
const {
  has
} = Reflect;

class PythonRunner {
  constructor(funOptions, env) {
    Object.defineProperty(this, _env, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _handlerName, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _handlerPath, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _runtime, {
      writable: true,
      value: null
    });
    const {
      handlerName,
      handlerPath,
      runtime
    } = funOptions;
    _classPrivateFieldLooseBase(this, _env)[_env] = env;
    _classPrivateFieldLooseBase(this, _handlerName)[_handlerName] = handlerName;
    _classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath] = handlerPath;
    _classPrivateFieldLooseBase(this, _runtime)[_runtime] = runtime;
  } // no-op
  // () => void


  cleanup() {}

  _parsePayload(value) {
    let payload;

    for (const item of value.split(_os.EOL)) {
      let json; // first check if it's JSON

      try {
        json = parse(item); // nope, it's not JSON
      } catch (err) {} // no-op
      // now let's see if we have a property __offline_payload__


      if (json && typeof json === 'object' && has(json, '__offline_payload__')) {
        payload = json.__offline_payload__; // everything else is print(), logging, ...
      } else {
        console.log(item);
      }
    }

    return payload;
  } // invokeLocalPython, loosely based on:
  // https://github.com/serverless/serverless/blob/v1.50.0/lib/plugins/aws/invokeLocal/index.js#L410
  // invoke.py, copy/pasted entirely as is:
  // https://github.com/serverless/serverless/blob/v1.50.0/lib/plugins/aws/invokeLocal/invoke.py


  async run(event, context) {
    const runtime = (0, _os.platform)() === 'win32' ? 'python.exe' : _classPrivateFieldLooseBase(this, _runtime)[_runtime];
    const input = stringify({
      context,
      event
    });

    if (process.env.VIRTUAL_ENV) {
      const runtimeDir = (0, _os.platform)() === 'win32' ? 'Scripts' : 'bin';
      process.env.PATH = [(0, _path.join)(process.env.VIRTUAL_ENV, runtimeDir), _path.delimiter, process.env.PATH].join('');
    }

    const [pythonExecutable] = runtime.split('.');
    const python = (0, _execa.default)(pythonExecutable, ['-u', (0, _path.resolve)(__dirname, 'invoke.py'), (0, _path.relative)(cwd(), _classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]), _classPrivateFieldLooseBase(this, _handlerName)[_handlerName]], {
      env: _classPrivateFieldLooseBase(this, _env)[_env],
      input // shell: true,

    });
    let result;

    try {
      result = await python;
    } catch (err) {
      // TODO
      console.log(err);
      throw err;
    }

    const {
      stderr,
      stdout
    } = result;

    if (stderr) {
      // TODO
      console.log(stderr);
    }

    try {
      return this._parsePayload(stdout);
    } catch (err) {
      // TODO
      console.log('No JSON'); // TODO return or re-throw?

      return err;
    }
  }

}

exports.default = PythonRunner;

var _env = _classPrivateFieldLooseKey("env");

var _handlerName = _classPrivateFieldLooseKey("handlerName");

var _handlerPath = _classPrivateFieldLooseKey("handlerPath");

var _runtime = _classPrivateFieldLooseKey("runtime");