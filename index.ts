import express from 'express';
import path from 'path';

import parseUrl from './helpers/parseUrl';
import zroots from './helpers/zroots';
import Validity from './helpers/validity';

const PORT = process.env.PORT || 5001;
const server = express();

const baseUrl = "https://ts-root-finder-0f013aa515ae.herokuapp.com";
const frag1 = "/[1,5,0,-4]";
const frag2 = "/1-4x**3+5x";
express()
  .use(express.static(path.join(__dirname, '../public')))
  .set('views', path.join(__dirname, '../views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render(
    'pages/index', {baseUrl, frag1, frag2}))
  .get('/:data', (req, res) => {
    const url = req.params.data;
    const parseResult = parseUrl(url);
    if (!parseResult.ok) return res.render('pages/error', {error: parseResult.error});
    const [coefs, varName] = parseResult.value;
    const rootsResult = zroots(coefs, true);
    if (!rootsResult.ok) return res.render('/pages/error', {error: rootsResult.error});
    const roots = rootsResult.value;
    const validity = new Validity(coefs, roots, varName);
    res.render('pages/result', {validity});
  })
  .get('/api/:data', (req, res) => {
    const url = req.params.data;
    const parseResult = parseUrl(url);
    if (!parseResult.ok) return res.json({"error": parseResult.error});
    const [coefs, varName] = parseResult.value;
    const rootsResult = zroots(coefs, true);
    if (!rootsResult.ok) return res.json({"error": rootsResult.error});
    const roots = rootsResult.value;
    const validity = new Validity(coefs, roots, varName);
    res.json({
      "coefficients": validity.coefs,
      "roots": validity.roots.map(root => ({
        "real": root.real,
        "imaginary": root.imag,
        "modulus": root.abs,
        "argument": root.arg
      })),
      "validity": {
        "sum": {
          "real": validity.sum.real,
          "imaginary": validity.sum.imag
        },
        "prod": {
          "real": validity.prod.real,
          "imaginary": validity.prod.imag
        },
        "sumMod": validity.sumMod
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
