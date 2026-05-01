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
  response.render('dashboard.liquid');
});

app.get('/instrumenten', async function (request, response) {
  const page = parseInt(request.query.page) || 1; //ai
  const limit = 20; // ai
  const offset = (page - 1) * limit; // ai

  let url = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/'
  let params = new URLSearchParams();

  // filteren
  if (request.query.status) {
    params.append('filter[status][_eq]', request.query.status);
  }

  if (request.query.type) {
    params.append('filter[type][_eq]', request.query.type);
  }

  // sorteren
  params.append('sort', request.query.sort || '-id');

  // pagins 
  params.append('limit', limit); // ai
  params.append('offset', offset); // ai
  // Totaal aantal ophalen
  params.append('meta', 'total_count'); // ai
  url = url + '?' + params.toString(); // ai

  const instrumentsResponse = await fetch(url) 
  const instrumentsResponseJSON = await instrumentsResponse.json()

  const totalItems = instrumentsResponseJSON.meta.total_count; // ai
  const totalPages = Math.ceil(totalItems / limit); // ai
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // ai

  response.render('overzicht.liquid', {
    instruments: instrumentsResponseJSON.data,
    path: request.path,
    status: request.query.status || null,
    type: request.query.type || '',
    sort: request.query.sort || null,
    totalItems: totalItems,
    pages: pages,
    successName: request.query.name || null,
  });
});

app.get('/instrumenten:id', async function (request, response) {
  const url = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/' + request.params.id;

  const instrumentsResponse = await fetch(url) 
  const instrumentsResponseJSON = await instrumentsResponse.json()

  response.render('detail.liquid', {
    instruments: instrumentsResponseJSON.data,
    type: request.query.type || '',
    actie:request.query.action || null,
    status: request.query.status || null
  });
});

app.get('/activiteiten', async function (request, response) {
  response.render('activiteitenlog.liquid');
});



app.post('/instrumenten', async function (request, response){
});

app.post('/instrumenten/:id/uitlenen', async function (request, response){
});

app.post('/instrumenten/:id/innemen', async function (request, response){
});

app.post('/instrumenten/:id/schade', async function (request, response){
});

/*
app.post('/instrumenten/delete', async function (request, response){

  console.log('Delete aangeroepen')
  console.log('ID:', request.body.id)

   const fetchResponse = await fetch('https://fdnd-agency.directus.app/items/preludefonds_instruments/' + request.body.id, {
    method: 'DELETE'
  });

  console.log('Directus status:', fetchResponse.status)

  response.redirect(303, '/instrumenten');
});
*/

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.`)
})
