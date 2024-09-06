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
exports.dataInit = void 0;
const character_model_1 = __importDefault(require("../models/character.model"));
const axios_1 = __importDefault(require("axios"));
const dataInit = () => __awaiter(void 0, void 0, void 0, function* () {
    const json = yield axios_1.default.get("https://rickandmortyapi.com/api/character");
    const response = json.data;
    const characters = response.results;
    if (!characters) {
        throw new Error("No se encontraron resultados de personajes");
    }
    for (const character of characters) {
        const filter = { _id: character.id };
        const characterApi = new character_model_1.default({
            _id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
            gender: character.gender,
            image: character.image,
            created: false,
        });
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        yield character_model_1.default.findOneAndUpdate(filter, characterApi, options);
    }
    const charactersInit = yield character_model_1.default.find();
    console.log("Successfully synchronized characters");
    return charactersInit;
});
exports.dataInit = dataInit;
