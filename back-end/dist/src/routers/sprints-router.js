"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sprintRouter = void 0;
var express_1 = require("express");
var sprints_controller_1 = require("../controllers/sprints-controller");
var authentication_middleware_1 = require("../middlewares/authentication-middleware");
var validation_middleware_1 = require("../middlewares/validation-middleware");
var sprints_schema_1 = require("../schemas/sprints-schema");
var sprintRouter = (0, express_1.Router)();
exports.sprintRouter = sprintRouter;
sprintRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .post("/", (0, validation_middleware_1.validateBody)(sprints_schema_1.sprintSchema), sprints_controller_1.createSprint)
    .get("/:projectId", (0, validation_middleware_1.validateParams)(sprints_schema_1.sprintParamsSchema), sprints_controller_1.getSprintsByProjectId)
    .delete("/:sprintId", sprints_controller_1.deleteSprint);
