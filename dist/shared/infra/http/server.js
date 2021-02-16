"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireWildcard(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppErrors = _interopRequireDefault(require("../../errors/AppErrors"));

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-console */
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use(_rateLimiter.default);
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, req, res, _) => {
  if (err instanceof _AppErrors.default) {
    return res.status(err.statusCode).json({
      status: 'error',
      msg: err.msg
    });
  }

  console.log('==========>', err);
  return _express.response.status(500).json({
    status: 'error',
    msg: 'Internal server erro'
  });
});
app.listen(3333, () => console.log('Server running at port 3333!'));