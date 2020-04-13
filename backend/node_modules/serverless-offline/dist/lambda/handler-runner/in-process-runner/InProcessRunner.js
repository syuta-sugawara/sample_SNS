"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _perf_hooks = require("perf_hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

const {
  assign
} = Object;

class InProcessRunner {
  constructor(functionKey, handlerPath, handlerName, env, timeout) {
    Object.defineProperty(this, _env, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _functionKey, {
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
    Object.defineProperty(this, _timeout, {
      writable: true,
      value: null
    });
    _classPrivateFieldLooseBase(this, _env)[_env] = env;
    _classPrivateFieldLooseBase(this, _functionKey)[_functionKey] = functionKey;
    _classPrivateFieldLooseBase(this, _handlerName)[_handlerName] = handlerName;
    _classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath] = handlerPath;
    _classPrivateFieldLooseBase(this, _timeout)[_timeout] = timeout;
  } // no-op
  // () => void


  cleanup() {}

  async run(event, context) {
    // check if the handler module path exists
    if (!require.resolve(_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath])) {
      throw new Error(`Could not find handler module '${_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]}' for function '${_classPrivateFieldLooseBase(this, _functionKey)[_functionKey]}'.`);
    } // process.env should be available in the handler module scope as well as in the handler function scope
    // NOTE: Don't use Object spread (...) here!
    // otherwise the values of the attached props are not coerced to a string
    // e.g. process.env.foo = 1 should be coerced to '1' (string)


    assign(process.env, _classPrivateFieldLooseBase(this, _env)[_env]); // lazy load handler with first usage

    const {
      [_classPrivateFieldLooseBase(this, _handlerName)[_handlerName]]: handler
    } = await Promise.resolve().then(() => _interopRequireWildcard(require(`${_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]}`)));

    if (typeof handler !== 'function') {
      throw new Error(`offline: handler '${_classPrivateFieldLooseBase(this, _handlerName)[_handlerName]}' in ${_classPrivateFieldLooseBase(this, _handlerPath)[_handlerPath]} is not a function`);
    }

    let callback;
    const callbackCalled = new Promise((resolve, reject) => {
      callback = (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      };
    });
    const executionTimeout = _perf_hooks.performance.now() + _classPrivateFieldLooseBase(this, _timeout)[_timeout] * 1000; // attach doc-deprecated functions
    // create new immutable object

    const lambdaContext = { ...context,
      getRemainingTimeInMillis: () => {
        const timeLeft = executionTimeout - _perf_hooks.performance.now(); // just return 0 for now if we are beyond alotted time (timeout)


        return timeLeft > 0 ? timeLeft : 0;
      },
      done: (err, data) => callback(err, data),
      fail: err => callback(err),
      succeed: res => callback(null, res)
    };
    let result; // execute (run) handler

    try {
      result = handler(event, lambdaContext, callback);
    } catch (err) {
      // this only executes when we have an exception caused by synchronous code
      // TODO logging
      console.log(err);
      throw new Error(`Uncaught error in '${_classPrivateFieldLooseBase(this, _functionKey)[_functionKey]}' handler.`);
    } // // not a Promise, which is not supported by aws
    // if (result == null || typeof result.then !== 'function') {
    //   throw new Error(`Synchronous function execution is not supported.`)
    // }


    const callbacks = [callbackCalled]; // Promise was returned

    if (result != null && typeof result.then === 'function') {
      callbacks.push(result);
    }

    let callbackResult;

    try {
      callbackResult = await Promise.race(callbacks);
    } catch (err) {
      // TODO logging
      console.log(err);
      throw err;
    }

    return callbackResult;
  }

}

exports.default = InProcessRunner;

var _env = _classPrivateFieldLooseKey("env");

var _functionKey = _classPrivateFieldLooseKey("functionKey");

var _handlerName = _classPrivateFieldLooseKey("handlerName");

var _handlerPath = _classPrivateFieldLooseKey("handlerPath");

var _timeout = _classPrivateFieldLooseKey("timeout");