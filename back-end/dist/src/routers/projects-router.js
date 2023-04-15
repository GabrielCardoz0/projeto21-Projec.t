"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsRouter = void 0;
var express_1 = require("express");
var projects_controller_1 = require("../controllers/projects-controller");
var authentication_middleware_1 = require("../middlewares/authentication-middleware");
var validation_middleware_1 = require("../middlewares/validation-middleware");
var project_schema_1 = require("../schemas/project-schema");
var projectsRouter = (0, express_1.Router)();
exports.projectsRouter = projectsRouter;
projectsRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .post("", (0, validation_middleware_1.validateBody)(project_schema_1.projectSchema), projects_controller_1.createProject)
    .get("", projects_controller_1.getProjects)
    .delete("/:projectId", projects_controller_1.deleteProject);
