"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const entities = tslib_1.__importStar(require("./models"));
dotenv_1.default.config();
exports.config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    logging: process.env.NODE_ENV === 'development' ? 'all' : false,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: [...Object.values(entities)],
    migrations: [
        'src/lib/typeorm/migrations/**/*.ts',
    ],
    subscribers: [
        'src/lib/typeorm/subscriber/**/*.ts',
    ],
    cli: {
        migrationsDir: 'src/lib/typeorm/migrations/generated',
    },
};
//# sourceMappingURL=connection.js.map