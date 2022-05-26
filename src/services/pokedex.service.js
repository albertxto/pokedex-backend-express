import httpStatus from 'http-status';
import Pokedex from 'pokedex-promise-v2';
import { FavoritePokemon } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

const P = new Pokedex();

/**
 * Query for pokemons
 * @param {number} [options.limit] - Maximum number of results per page (default = 50)
 * @param {number} [options.offset] - Current offset (default = 0)
 * @returns {Promise<P>}
 */
const queryPokemons = async (options) => {
  const pokemons = await P.getPokemonsList(options);
  return pokemons;
};

/**
 * Get pokemon by id
 * @param {any} id
 * @returns {Promise<P>}
 */
const getPokemonById = async (id) => {
  let pokemonId = id;
  if (id.indexOf(',') !== -1) {
    pokemonId = id.split(',');
  }
  const pokemon = P.getPokemonByName(pokemonId);
  const species = P.getPokemonSpeciesByName(pokemonId);
  return Promise.all([pokemon, species]);
};

/**
 * Get pokemon evolution chain by id
 * @param {number} id
 * @returns {Promise<P>}
 */
const getPokemonEvolutionChainById = async (id) => {
  const evolutionChain = await P.getEvolutionChainById(id);
  return evolutionChain;
};

/**
 * Get pokemon form by id
 * @param {any} id
 * @returns {Promise<P>}
 */
const getPokemonFormById = async (id) => {
  const pokemonForm = await P.getPokemonByName(id);
  return pokemonForm;
};

/**
 * Create a favorite pokemon
 * @param {Object} favoritePokemonBody
 * @returns {Promise<FavoritePokemon>}
 */
const createFavoritePokemon = async (favoritePokemonBody) => {
  return FavoritePokemon.create(favoritePokemonBody);
};

/**
 * Query for favorite pokemons
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFavoritePokemons = async (filter, options) => {
  const favoritePokemons = await FavoritePokemon.paginate(filter, options);
  return favoritePokemons;
};

/**
 * Get favorite pokemons count
 * @returns {Promise<Number>}
 */
const getFavoritePokemonsCount = async () => {
  return FavoritePokemon.count();
};

/**
 * Get favorite pokemon by user and pokemon
 * @param {Object} favoritePokemonBody
 * @returns {Promise<FavoritePokemon>}
 */
const getFavoritePokemon = async ({ user, pokemon }) => {
  return FavoritePokemon.findOne({ user, pokemon });
};

/**
 * Get favorite pokemon by id
 * @param {ObjectId} favoritePokemonId
 * @returns {Promise<FavoritePokemon>}
 */
const getFavoritePokemonById = async (id) => {
  return FavoritePokemon.findById(id);
};

/**
 * Delete favorite pokemon by id
 * @param {ObjectId} favoritePokemonId
 * @returns {Promise<FavoritePokemon>}
 */
const deleteFavoritePokemon = async (favoritePokemonId) => {
  const favoritePokemon = await getFavoritePokemonById(favoritePokemonId);
  if (!favoritePokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Favorite pokemon not found');
  }
  await favoritePokemon.remove();
  return favoritePokemon;
};

export default {
  queryPokemons,
  getPokemonById,
  getPokemonEvolutionChainById,
  getPokemonFormById,
  createFavoritePokemon,
  queryFavoritePokemons,
  getFavoritePokemonsCount,
  getFavoritePokemon,
  deleteFavoritePokemon,
};
