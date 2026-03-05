"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const employees_routes_1 = __importDefault(require("./routes/employees.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const clients_routes_1 = __importDefault(require("./routes/clients.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/employees', employees_routes_1.default);
app.use('/api/tasks', tasks_routes_1.default);
app.use('/api/clients', clients_routes_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'AR-Genix API is running' });
});
exports.default = app;
