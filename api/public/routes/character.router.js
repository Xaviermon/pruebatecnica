"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const character_handler_1 = require("../handlers/character.handler");
const characterRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Character management routes
 */
/**
 * @swagger
 * /characters/get-all:
 *   get:
 *     summary: Get all characters
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *         required: false
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of characters per page
 *         required: false
 *     responses:
 *       200:
 *         description: A list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The character ID
 *         name:
 *           type: string
 *           description: The name of the character
 *         status:
 *           type: string
 *           description: The status of the character (alive, dead, unknown)
 *         species:
 *           type: string
 *           description: The species of the character
 *         type:
 *           type: string
 *           description: The type or sub-species of the character
 *         gender:
 *           type: string
 *           description: The gender of the character
 *         image:
 *           type: string
 *           description: The image URL of the character
 */
characterRouter.get("/get-all", character_handler_1.getCharacters);
/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Get a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character ID
 *     responses:
 *       200:
 *         description: Character data
 *       404:
 *         description: Character not found
 */
characterRouter.get("/get/:id", character_handler_1.getCharacterId);
/**
 * @swagger
 * /characters/create:
 *   post:
 *     summary: Create a new character
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The character ID
 *               name:
 *                 type: string
 *                 description: The name of the character
 *               status:
 *                 type: string
 *                 description: The status of the character (alive, dead, unknown)
 *               species:
 *                 type: string
 *                 description: The species of the character
 *               type:
 *                 type: string
 *                 description: The type or sub-species of the character
 *               gender:
 *                 type: string
 *                 description: The gender of the character
 *               image:
 *                 type: string
 *                 description: The image URL of the character
 *     responses:
 *       201:
 *         description: Character created successfully
 */
characterRouter.post("/create", character_handler_1.createCharacter);
/**
 * @swagger
 * /characters/update/{id}:
 *   put:
 *     summary: Update a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The character ID
 *               name:
 *                 type: string
 *                 description: The name of the character
 *               status:
 *                 type: string
 *                 description: The status of the character (alive, dead, unknown)
 *               species:
 *                 type: string
 *                 description: The species of the character
 *               type:
 *                 type: string
 *                 description: The type or sub-species of the character
 *               gender:
 *                 type: string
 *                 description: The gender of the character
 *               image:
 *                 type: string
 *                 description: The image URL of the character
 *     responses:
 *       200:
 *         description: Character updated successfully
 *       404:
 *         description: Character not found
 */
characterRouter.put("/update/:id", character_handler_1.updateCharacterHandler);
/**
 * @swagger
 * /characters/delete/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The character ID
 *     responses:
 *       200:
 *         description: Character deleted successfully
 *       404:
 *         description: Character not found
 */
characterRouter.delete("/delete/:id", character_handler_1.deleteCharacterHandler);
exports.default = characterRouter;
