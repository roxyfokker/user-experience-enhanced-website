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
  response.render('overzicht.liquid');
});

app.get('/instrumenten:id', async function (request, response) {
  response.render('detail.liquid');
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
