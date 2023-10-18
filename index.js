import express from 'express';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import hbs from 'hbs';
import { forcast } from './utils/forcast.js';
import { geocode } from './utils/geocode.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
console.log(path.join(__dirname, '/public'));

const app = express();
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Light Yagami',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Light Yagami',
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  try {
    const { latitude, longitude, location } = await geocode(req.query.address);
    const data = await forcast(latitude, longitude);
    console.log(location);
    console.log(data);
    res.send({
      forcast: data,
      location,
      address: req.query.address,
    });
  } catch (error) {
    return res.send({
      error,
    });
  }
});

app.get('*', (req, res) => {
  res.render('error', { title: '404', name: 'Light Yagami' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('running on port 3000');
});
