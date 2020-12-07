"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMongoDocument = void 0;
const Models_1 = require("./Models");
function generateMongoDocument(modelKey) {
    const model = Models_1.models[modelKey];
    return class MongoDocument {
        document;
        query;
        load;
        constructor(query) {
            if (typeof query === 'object') {
                this.query = { id: typeof query.id === 'string' ? { id: query.id } : query.id, model: modelKey };
            }
            else if (typeof query === 'string') {
                this.query = { id: { id: query }, model: modelKey };
            }
            this.load = this.reload();
        }
        async reload() {
            const { id } = this.query;
            this.document = await model.findOne(id);
            return this;
        }
        async get(path, defaultType) {
            if (!this.document)
                await this.load;
            return this.document.get(path, defaultType);
        }
        async set(path, value) {
            if (!this.document)
                await this.load;
            await this.document.updateOne({ [path]: value }, { upsert: true });
            return this.reload();
        }
    };
}
exports.generateMongoDocument = generateMongoDocument;
