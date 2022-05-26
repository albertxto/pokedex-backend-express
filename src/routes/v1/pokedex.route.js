import express from 'express';
import pokedexController from '../../controllers/pokedex.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', pokedexController.getPokemons);
router.get('/evolution-chain/:evolutionChainId', pokedexController.getPokemonEvolutionChain);
router.get('/favorite/:pokemonId', auth(), pokedexController.getFavoritePokemon);
router.post('/favorite/:pokemonId', auth(), pokedexController.setFavoritePokemon);
router.get('/form/:pokemonId', pokedexController.getPokemonForm);
router.get('/info/:pokemonId', pokedexController.getPokemon);
router.get('/list', auth(), pokedexController.getFavoritePokemons);
router.get('/list/count', auth(), pokedexController.getFavoritePokemonsCount);

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
 * /pokedex/list:
 *   get:
 *     summary: Get all favorite pokemons
 *     description: Logged in users can fetch only their own favorite pokemons information.
 *     tags: [Pokedex]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pokemon
 *         schema:
 *           type: number
 *         description: Pokemon id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. pokemon:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of favorite pokemons
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                     $ref: '#/components/schemas/FavoritePokemon'
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /pokedex/list/count:
 *   get:
 *     summary: Get favorite pokemons count
 *     description: Logged in users can fetch favorite pokemons count.
 *     tags: [Pokedex]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Count'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /pokedex/favorite/{id}:
 *   get:
 *     summary: Get a favorite pokemon
 *     description: Logged in users can fetch only their own favorite pokemon information.
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
 *                $ref: '#/components/schemas/IsFavoritePokemon'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   post:
 *     summary: Set or unset pokemon as favorite
 *     description: Users can set pokemon as favorite or unset pokemon from favorite.
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
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
