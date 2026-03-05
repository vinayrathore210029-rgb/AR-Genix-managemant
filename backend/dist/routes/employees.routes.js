"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controller_1 = require("../controllers/employees.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), employees_controller_1.createEmployee);
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employees_controller_1.getEmployees);
exports.default = router;
