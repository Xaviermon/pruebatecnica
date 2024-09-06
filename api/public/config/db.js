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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbInit_controller_1 = require("../controllers/dbInit.controller");
dotenv_1.default.config();
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set("strictQuery", false);
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI no está definido en las variables de entorno.");
        }
        const conn = yield mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 1000,
        });
        yield (0, dbInit_controller_1.dataInit)();
        console.log(`DataBase connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
});
exports.default = connectDb;
