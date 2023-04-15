"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var projects_repository_1 = __importDefault(require("../../repositories/projects-repository"));
var sprints_repository_1 = __importDefault(require("../../repositories/sprints-repository"));
var tasks_repository_1 = __importDefault(require("../../repositories/tasks-repository"));
var users_repository_1 = __importDefault(require("../../repositories/users-repository"));
function createTask(userId, task) {
    return __awaiter(this, void 0, void 0, function () {
        var sprint, project, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sprints_repository_1.default.getSprintById(task.sprintId)];
                case 1:
                    sprint = _a.sent();
                    if (!sprint)
                        throw { name: "NotFoundError", message: "sprint not found" };
                    return [4 /*yield*/, projects_repository_1.default.getProjectById(sprint.projectId)];
                case 2:
                    project = _a.sent();
                    if (!project)
                        throw { name: "BadRequest", message: "Project not found or deleted" };
                    return [4 /*yield*/, users_repository_1.default.findUserById(userId)];
                case 3:
                    user = _a.sent();
                    if (project.userId !== userId)
                        throw { name: "UnauthorizedError", message: "wrong userId" };
                    return [2 /*return*/, tasks_repository_1.default.createTask((task.responsible || user.name), task)];
            }
        });
    });
}
;
function getTasksBySprintId(userId, sprintId) {
    return __awaiter(this, void 0, void 0, function () {
        var sprint, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sprints_repository_1.default.getSprintById(sprintId)];
                case 1:
                    sprint = _a.sent();
                    if (!sprint)
                        throw { name: "NotFoundError", message: "sprint not found" };
                    return [4 /*yield*/, projects_repository_1.default.getProjectById(sprint.projectId)];
                case 2:
                    project = _a.sent();
                    if (!project)
                        throw { name: "NotFoundError", message: "project not found" };
                    if (project.userId !== userId)
                        throw { name: "UnauthorizedError", message: "wrong userId" };
                    return [2 /*return*/, tasks_repository_1.default.getTasksBySprintId(sprintId)];
            }
        });
    });
}
;
function updateTaskById(userId, newTask) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, task, sprint, _b, _c, _d, project;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _c = (_b = Promise).all;
                    return [4 /*yield*/, tasks_repository_1.default.getTaskById(newTask.id)];
                case 1:
                    _d = [
                        _e.sent()
                    ];
                    return [4 /*yield*/, sprints_repository_1.default.getSprintById(newTask.sprintId)];
                case 2: return [4 /*yield*/, _c.apply(_b, [_d.concat([
                            _e.sent()
                        ])])];
                case 3:
                    _a = _e.sent(), task = _a[0], sprint = _a[1];
                    if (!sprint || !task)
                        throw { name: "NotFoundError", message: "sprint or task not found" };
                    return [4 /*yield*/, projects_repository_1.default.getProjectById(sprint.projectId)];
                case 4:
                    project = _e.sent();
                    if (!project)
                        throw { name: "NotFoundError", message: "project not found" };
                    if (project.userId !== userId)
                        throw { name: "UnauthorizedError", message: "wrong userId" };
                    return [2 /*return*/, tasks_repository_1.default.updateTask(newTask)];
            }
        });
    });
}
;
function deleteTaskById(userId, taskId) {
    return __awaiter(this, void 0, void 0, function () {
        var task, projects, sprintsList, sprintsIdList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tasks_repository_1.default.getTaskById(taskId)];
                case 1:
                    task = _a.sent();
                    if (!task)
                        throw { name: "NotFoundError", message: "task not found" };
                    return [4 /*yield*/, projects_repository_1.default.getProjectsWithSprintsByUserId(userId)];
                case 2:
                    projects = _a.sent();
                    if (projects.length < 1)
                        throw { name: "BadRequest", message: "Projects not found" };
                    sprintsList = projects.map(function (p) { return p.Project.Sprint; });
                    sprintsIdList = [];
                    sprintsList.map(function (s) { return s.map(function (data) { return sprintsIdList.push(data.id); }); });
                    if (!sprintsIdList.includes(task.sprintId))
                        throw { name: "UnauthorizedError", message: "wrong task id, task and user sprints dont match" };
                    return [2 /*return*/, tasks_repository_1.default.deleteTaskById(taskId)];
            }
        });
    });
}
;
var taskService = {
    createTask: createTask,
    getTasksBySprintId: getTasksBySprintId,
    updateTaskById: updateTaskById,
    deleteTaskById: deleteTaskById,
};
exports.default = taskService;
