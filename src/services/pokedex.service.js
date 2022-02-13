import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

/**
 * Get pokedex by id
 * @param {number} id
 */
const getPokemonById = async (id) => {
  const pokemon = P.getPokemonByName(id);
  const species = P.getPokemonSpeciesByName(id);
  return Promise.all([pokemon, species]);
};

export default {
  getPokemonById,
};
