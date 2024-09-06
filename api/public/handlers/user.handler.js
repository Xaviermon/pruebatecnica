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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = void 0;
const user_controller_1 = require("../controllers/user.controller");
const jwt_1 = require("../utils/jwt");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const valUser = yield (0, user_controller_1.validateUser)(username, password);
        const createToken = (0, jwt_1.generateToken)(valUser.id);
        return res.status(200).json({
            username: valUser.username,
            auth: true,
            token: createToken,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const newUser = yield (0, user_controller_1.registerUser)(username, password);
        return res.status(200).json(newUser);
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.createUser = createUser;
