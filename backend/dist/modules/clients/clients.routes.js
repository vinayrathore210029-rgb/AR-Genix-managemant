"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_controller_1 = require("./clients.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN']), clients_controller_1.createClient);
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), clients_controller_1.getClients);
exports.default = router;
