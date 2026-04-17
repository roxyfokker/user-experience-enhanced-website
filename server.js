import express from 'express'
import { Liquid } from 'liquidjs';

const app = express();
const apiResponse = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments')
const apiResponseJSON = await apiResponse.json()

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views');

app.get('/', async function (request, response) {
  response.render('.liquid');
});