import Pokedex from 'pokedex-promise-v2';

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

export default {
  queryPokemons,
  getPokemonById,
  getPokemonEvolutionChainById,
  getPokemonFormById,
};
