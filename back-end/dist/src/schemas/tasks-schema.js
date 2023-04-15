"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskUpdateSchema = exports.taskParamsSchema = exports.taskSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.taskSchema = joi_1.default.object({
    sprintId: joi_1.default.number().required(),
    responsible: joi_1.default.string().required(),
    task: joi_1.default.string().required(),
    description: joi_1.default.string(),
    status: joi_1.default.string(),
    endsAt: joi_1.default.date(),
    createdAt: joi_1.default.date(),
});
exports.taskParamsSchema = joi_1.default.object({
    sprintId: joi_1.default.number().required(),
});
exports.taskUpdateSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    sprintId: joi_1.default.number().required(),
    status: joi_1.default.string().required(),
});
