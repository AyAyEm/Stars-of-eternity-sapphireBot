"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("@root/config");
const MongoDocument_1 = require("./MongoDocument");
const Provider_1 = require("../Provider");
const models_1 = require("./models");
const mongoConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
class Mongoose extends Provider_1.Provider {
    generateDocument = MongoDocument_1.generateMongoDocument;
    Trackers = MongoDocument_1.generateMongoDocument('Trackers');
    Guilds = MongoDocument_1.generateMongoDocument('Guilds');
    Users = MongoDocument_1.generateMongoDocument('Users');
    Utils = MongoDocument_1.generateMongoDocument('Utils');
    models = models_1.models;
    connection;
    constructor(connectionString = config_1.config.mongoConnectionString) {
        super();
        this.connection = mongoose_1.default
            .connect(connectionString, mongoConnectionOptions)
            .then(() => this);
    }
    async get(query, path) {
        const Model = models_1.models[query.model];
        if (Model) {
            const identify = typeof query.id === 'string' ? { id: query.id } : query.id;
            const queryResult = await Model.findOne(identify);
            return path ? queryResult.get(path) : queryResult;
        }
        return null;
    }
    async getAll(model, { filter = {}, path } = {}) {
        const Model = models_1.models[model];
        if (Model) {
            const documents = await Model.find(filter);
            return path ? documents.map((doc) => doc.get(path)) : documents;
        }
        return null;
    }
    async set(query, path, value) {
        const document = await this.get(query);
        await document.updateOne({ [path]: value });
        return this;
    }
}
exports.Mongoose = Mongoose;
//# sourceMappingURL=Mongoose.js.map