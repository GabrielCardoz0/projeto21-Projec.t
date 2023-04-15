"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteParamsSchema = exports.noteSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.noteSchema = joi_1.default.object({
    projectId: joi_1.default.number().required(),
    note: joi_1.default.string().required(),
});
exports.noteParamsSchema = joi_1.default.object({
    projectId: joi_1.default.number().required(),
});
