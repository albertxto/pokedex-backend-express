import express from 'express';
import pokedexController from '../../controllers/pokedex.controller.js';

const router = express.Router();

router.get('/:pokemonId', pokedexController.getPokemon);
router.get('/evolution-chain/:evolutionChainId', pokedexController.getPokemonEvolutionChain);

export default router;

/**
 * @swagger
 * tags:
 *   name: Pokedex
 *   description: Pokedex Promises v2
 */

/**
 * @swagger
 * /pokedex/{id}:
 *   get:
 *     summary: Get a pokemon
 *     description: Users can fetch pokemon informations.
 *     tags: [Pokedex]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pokemon id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Pokemon'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /pokedex/evolution-chain/{id}:
 *   get:
 *     summary: Get a pokemon evolution chain
 *     description: Users can fetch pokemon evolution chain informations.
 *     tags: [Pokedex]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Evolution chain id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Pokemon'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
