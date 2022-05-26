// import * as packageJson from '../../package.json';
import config from '../config/config.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'pokedex-backend-express API documentation',
    // version: packageJson.default.version,
    license: {
      name: 'MIT',
      url: 'https://github.com/albertxto/pokedex-backend-express/blob/master/LICENSE.md',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
