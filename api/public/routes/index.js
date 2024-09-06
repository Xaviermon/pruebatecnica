"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const character_router_1 = __importDefault(require("../routes/character.router"));
const user_router_1 = __importDefault(require("./user.router"));
const router = (0, express_1.Router)();
router.use("/character", character_router_1.default);
router.use("/user", user_router_1.default);
exports.default = router;
