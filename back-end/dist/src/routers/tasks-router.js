"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
var express_1 = require("express");
var tasks_controller_1 = require("../controllers/tasks-controller");
var authentication_middleware_1 = require("../middlewares/authentication-middleware");
var validation_middleware_1 = require("../middlewares/validation-middleware");
var tasks_schema_1 = require("../schemas/tasks-schema");
var taskRouter = (0, express_1.Router)();
exports.taskRouter = taskRouter;
taskRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .post("/", (0, validation_middleware_1.validateBody)(tasks_schema_1.taskSchema), tasks_controller_1.createTask)
    .get("/:sprintId", (0, validation_middleware_1.validateParams)(tasks_schema_1.taskParamsSchema), tasks_controller_1.getTasks)
    .put("/", (0, validation_middleware_1.validateBody)(tasks_schema_1.taskUpdateSchema), tasks_controller_1.updateTaskStatus)
    .delete("/:taskId", tasks_controller_1.deleteTask);
