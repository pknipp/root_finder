import express from 'express';
import path from 'path';

import parseUrl from './helpers/parseUrl';

const PORT = process.env.PORT || 5001;
const server = express();

express()
  .use(express.static(path.join(__dirname, '../public')))
  .set('views', path.join(__dirname, '../views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/:data', (req, res) => {
    const polynomial = req.params.data;
    const roots = parseUrl(polynomial);
    res.render('pages/result', {polynomial, roots});
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
