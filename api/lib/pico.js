import { end } from './response';

/**
 * Pico
 * ----
 * Inspired by Micro.js, cleans up Node standard HTTP listener functions
 * Pico takes a function that takes a request object and returns a response
 * object and returns a valid lambda function
 * @param {Request => Response} f a function that takes a request object and
 *                                returns a response object
 *
 */
const pico = f => (req, res) => new Promise(resolve => resolve(f(req)))
  .then((val) => {
    end(res, val);
  })
  .catch(err => console.log(err));

export default pico;
