"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitHandlerPathAndName;

// some-folder/src.index => some-folder/src
function splitHandlerPathAndName(handler) {
  // Split handler into method name and path i.e. handler.run
  // Support nested paths i.e. ./src/somefolder/.handlers/handler.run
  const delimiter = handler.lastIndexOf('.');
  const path = handler.substr(0, delimiter);
  const name = handler.substr(delimiter + 1);
  return [path, name];
}