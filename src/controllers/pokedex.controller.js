import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { pokedexService } from '../services/index.js';

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
  getPokemon,
  getPokemonEvolutionChain,
};
