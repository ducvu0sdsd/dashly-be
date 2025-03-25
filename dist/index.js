"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/routes"));
require("./src/custom.d");
// Load biến môi trường từ .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const baseURL = process.env.BASE_URL || "http://localhost:3000";
const baseURLDeploy = process.env.BASE_URL_DEPLOY || "https://dashly.vercel.app";
// Middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, compression_1.default)());
// Cấu hình CORS
const corsOptions = {
    origin: [baseURL, baseURLDeploy],
    allowedHeaders: ["Content-Type", "x-refresh-token", "authorization"]
};
app.use((0, cors_1.default)(corsOptions));
// init db
require('./src/dbs/init.mongodb');
// init routes
app.use(routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript!");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
