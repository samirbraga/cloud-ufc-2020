"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const http_status_codes_1 = require("http-status-codes");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const UserController_1 = __importDefault(require("./controller/UserController"));
const PostController_1 = __importDefault(require("./controller/PostController"));
const FeedController_1 = __importDefault(require("./controller/FeedController"));
class AppServer extends core_1.Server {
    constructor() {
        super(true);
        this.SERVER_STARTED = 'Server started on port: ';
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((_, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, Authorization");
            next();
        });
        this.setupControllers();
        this.app.use((error, req, res, next) => {
            logger_1.Logger.Err(error.toString());
            res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message
            });
        });
    }
    setupControllers() {
        super.addControllers([
            new UserController_1.default(),
            new PostController_1.default(),
            new FeedController_1.default()
        ]);
    }
    start(port) {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            logger_1.Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}
exports.default = AppServer;
//# sourceMappingURL=Server.js.map