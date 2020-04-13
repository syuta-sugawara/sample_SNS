"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detectExecutable;

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function detectExecutable(exe) {
  try {
    const {
      failed
    } = await (0, _execa.default)(exe, ['--version']);
    return failed === false;
  } catch (err) {
    return false;
  }
}