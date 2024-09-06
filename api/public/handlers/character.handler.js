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
exports.deleteCharacterHandler = exports.updateCharacterHandler = exports.getCharacterId = exports.createCharacter = exports.getCharacters = void 0;
const character_controller_1 = require("../controllers/character.controller");
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const data = yield (0, character_controller_1.getCharactersFromDb)(page, limit);
        return res.status(200).json(data);
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.getCharacters = getCharacters;
const createCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, status, species, type, gender, image, created, } = req.body;
        const newCharacter = yield (0, character_controller_1.addCharacter)(id, name, status, species, type, gender, image, created);
        return res.status(201).json(newCharacter);
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.createCharacter = createCharacter;
const getCharacterId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const character = yield (0, character_controller_1.getById)(id);
        return res.status(200).json(character);
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.getCharacterId = getCharacterId;
const updateCharacterHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, status, species, type, gender, image, created } = req.body;
        const updateChar = yield (0, character_controller_1.updateCharacter)(id, name, status, species, type, gender, image, created);
        return res.status(200).json(updateChar);
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.updateCharacterHandler = updateCharacterHandler;
const deleteCharacterHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteChar = yield (0, character_controller_1.deleteCharacter)(id);
        return res.status(200).json(deleteChar);
    }
    catch (error) {
        return res
            .status(500)
            .json({
            message: "Error al obtener los personajes",
            error: error.message,
        });
    }
});
exports.deleteCharacterHandler = deleteCharacterHandler;
