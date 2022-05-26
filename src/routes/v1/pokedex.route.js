import express from 'express';
import pokedexController from '../../controllers/pokedex.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', pokedexController.getPokemons);
router.get('/:pokemonId', pokedexController.getPokemon);
router.get('/evolution-chain/:evolutionChainId', pokedexController.getPokemonEvolutionChain);
router.get('/favorite/:pokemonId', auth(), pokedexController.getFavoritePokemon);
router.post('/favorite/:pokemonId', auth(), pokedexController.setFavoritePokemon);
router.get('/form/:pokemonId', pokedexController.getPokemonForm);

export default router;

/**
 * @swagger
 * tags:
 *   name: Pokedex
 *   description: Pokedex Promises v2
 */

/**
 * @swagger
 * /pokedex:
 *   get:
 *     summary: Get all pokemons
 *     description: Users can retrieve all pokemons.
 *     tags: [Pokedex]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 50
 *         description: Maximum number of pokemons
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Offset number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pokemon'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
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

/**
 * @swagger
 * /pokedex/favorite/{id}:
 *   post:
 *     summary: Set pokemon as favorite
 *     description: Users can set pokemon as favorite.
 *     tags: [Pokedex]
 *     security:
 *       - bearerAuth: []
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
