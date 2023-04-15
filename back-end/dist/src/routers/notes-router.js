"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
var express_1 = require("express");
var notes_controller_1 = require("../controllers/notes-controller");
var authentication_middleware_1 = require("../middlewares/authentication-middleware");
var validation_middleware_1 = require("../middlewares/validation-middleware");
var notes_schema_1 = require("../schemas/notes-schema");
var notesRouter = (0, express_1.Router)();
exports.notesRouter = notesRouter;
notesRouter
    .all("/*", authentication_middleware_1.authenticateToken)
    .post("/", (0, validation_middleware_1.validateBody)(notes_schema_1.noteSchema), notes_controller_1.createNote)
    .get("/:projectId", (0, validation_middleware_1.validateParams)(notes_schema_1.noteParamsSchema), notes_controller_1.getNotes)
    .delete("/:noteId", notes_controller_1.deleteNote);
