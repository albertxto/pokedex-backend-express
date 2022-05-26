import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins/index.js';

const favoritePokemonSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    pokemon: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a compound index
favoritePokemonSchema.index({ user: 1, pokemon: 1 });

// add plugin that converts mongoose to json
favoritePokemonSchema.plugin(toJSON);
favoritePokemonSchema.plugin(paginate);

/**
 * @typedef FavoritePokemon
 */
const FavoritePokemon = mongoose.model('FavoritePokemon', favoritePokemonSchema);

export default FavoritePokemon;
