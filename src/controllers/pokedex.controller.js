import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { pokedexService } from '../services/index.js';

const getPokemons = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'offset']);
  const result = await pokedexService.queryPokemons(options);
  res.send(result);
});

const getPokemon = catchAsync(async (req, res) => {
  const pokemon = await pokedexService.getPokemonById(req.params.pokemonId);
  if (!pokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pokemon not found');
  }
  res.send(pokemon);
});

const getPokemonEvolutionChain = catchAsync(async (req, res) => {
  const pokemon = await pokedexService.getPokemonEvolutionChainById(req.params.evolutionChainId);
  if (!pokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pokemon evolution chain not found');
  }
  res.send(pokemon);
});

export default {
  getPokemons,
  getPokemon,
  getPokemonEvolutionChain,
};
