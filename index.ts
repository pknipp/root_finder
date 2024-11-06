import express from 'express';
import path from 'path';

import parseUrl from './helpers/parseUrl';
import zroots from './helpers/zroots';
import Validity from './helpers/validity';

const PORT = process.env.PORT || 5001;
const server = express();

express()
  .use(express.static(path.join(__dirname, '../public')))
  .set('views', path.join(__dirname, '../views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
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
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
