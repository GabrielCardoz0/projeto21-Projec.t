"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateBody = void 0;
function validateBody(schema) {
    return validate(schema, "body");
}
exports.validateBody = validateBody;
function validateParams(schema) {
    return validate(schema, "params");
}
exports.validateParams = validateParams;
function validate(schema, type) {
    return function (req, res, next) {
        var error = schema.validate(req[type], {
            abortEarly: false,
        }).error;
        if (!error) {
            next();
        }
        else {
            return res.status(400).send(error.details.map(function (d) { return d.message; }));
        }
    };
}
