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
exports.deleteCharacter = exports.updateCharacter = exports.addCharacter = exports.getById = exports.getCharactersFromDb = void 0;
const character_model_1 = __importDefault(require("../models/character.model"));
const getCharactersFromDb = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const characters = yield character_model_1.default.find().skip(skip).limit(limit).exec();
    const total = yield character_model_1.default.countDocuments();
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        totalPages,
        totalCharacters: total,
        characters,
    };
});
exports.getCharactersFromDb = getCharactersFromDb;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const character = yield character_model_1.default.findById(id);
    if (!character) {
        throw new Error(`Character with id ${id} not found`);
    }
    return character;
});
exports.getById = getById;
const addCharacter = (_id, name, status, species, type, gender, image, created) => __awaiter(void 0, void 0, void 0, function* () {
    const character = new character_model_1.default({
        _id,
        name,
        status,
        species,
        type,
        gender,
        image,
        created,
    });
    yield character.save();
    return character;
});
exports.addCharacter = addCharacter;
const updateCharacter = (id, name, status, species, type, gender, image, created) => __awaiter(void 0, void 0, void 0, function* () {
    const updateCharacter = yield character_model_1.default.findByIdAndUpdate(id, {
        name,
        status,
        species,
        type,
        gender,
        image,
        created,
    }, { new: true });
    if (!updateCharacter) {
        throw new Error(`Character with id ${id} not found`);
    }
    return updateCharacter;
});
exports.updateCharacter = updateCharacter;
const deleteCharacter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findCharacter = yield (0, exports.getById)(id);
    if (!findCharacter)
        throw new Error("This ID does not correspond to any character");
    yield character_model_1.default.findByIdAndDelete(id);
    return findCharacter;
});
exports.deleteCharacter = deleteCharacter;
