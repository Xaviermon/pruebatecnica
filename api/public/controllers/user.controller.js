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
exports.registerUser = exports.validateUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const validateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const validateUser = yield user_model_1.default.findOne({ username });
    if (!validateUser)
        throw new Error("Invalid username");
    const userPass = crypto_js_1.default.SHA256(password).toString();
    const passwordValidate = userPass === validateUser.password;
    if (!passwordValidate)
        throw new Error("Invalid password");
    return validateUser;
});
exports.validateUser = validateUser;
const registerUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = crypto_js_1.default.SHA256(password).toString();
    const newUser = new user_model_1.default({ username, password: hashPassword });
    yield newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
