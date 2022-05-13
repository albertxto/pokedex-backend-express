import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

/**
 * Query for pokemons
 * @param {number} [options.limit] - Maximum number of results per page (default = 50)
 * @param {number} [options.offset] - Current offset (default = 0)
 * @returns {Promise<QueryResult>}
 */
const queryPokemons = async (options) => {
  return Promise.resolve(P.getPokemonsList(options));
};

/**
 * Get pokemon by id
 * @param {any} id
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
 */
const getPokemonEvolutionChainById = async (id) => {
  const evolutionChain = P.getEvolutionChainById(id);
  return Promise.resolve(evolutionChain);
};

export default {
  queryPokemons,
  getPokemonById,
  getPokemonEvolutionChainById,
};
