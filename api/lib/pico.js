import { end } from './response'

const pico = f => (req, res) => end(res, f(req))

export default pico
