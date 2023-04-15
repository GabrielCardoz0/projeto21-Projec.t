"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sprintParamsSchema = exports.sprintSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.sprintSchema = joi_1.default.object({
    projectId: joi_1.default.number().required(),
    number: joi_1.default.number().required(),
});
exports.sprintParamsSchema = joi_1.default.object({
    projectId: joi_1.default.number().required(),
});
