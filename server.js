import express from 'express'
import { Liquid } from 'liquidjs';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views');

app.get('/', async function (request, response) {
  const url = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/?limit=-1'
  const instrumentsResponse = await fetch(url) 
  const instrumentsResponseJSON = await instrumentsResponse.json()
  const allInstruments = instrumentsResponseJSON.data

  // Aantal instrumenten in database
  const totalItems = allInstruments.length
  // Aantal instrumenten met property preludefonds
  const totalPrelude = allInstruments.filter(i => i.property?.toLowerCase() === 'preludefonds').length
  // Aantal isntrumenten met property anders dan prelude fonds en null niet meerekenen 
  const totalAnders = allInstruments.filter(i => i.property !== null && i.property?.toLowerCase() !== 'preludefonds').length
  // Aantal instrumenten die beschikbaar zijn
  const totalBeschikbaar = allInstruments.filter(i => i.status !== null && i.status?.toLowerCase() === 'beschikbaar').length
  // Aantal instrumenten die in reparatie zijn
  const totalUitgeleend = allInstruments.filter(i => i.status !== null && i.status?.toLowerCase() === 'uitgeleend').length
  // Aantal instrumenten die uitgeleent zijn 
  const totalReparatie = allInstruments.filter(i => i.status !== null && i.status?.toLowerCase() === 'in reparatie').length

  response.render('dashboard.liquid', {
    instruments: allInstruments,
    totalItems: totalItems,
    totalPrelude: totalPrelude,
    totalAnders: totalAnders,
    totalBeschikbaar: totalBeschikbaar,
    totalUitgeleend: totalUitgeleend,
    totalReparatie: totalReparatie,
    status: request.query.status || null,
  });
});

app.get('/instrumenten', async function (request, response) {
  const url = 'https://fdnd-agency.directus.app/items/preludefonds_instruments/?limit=-1'
  const instrumentsResponse = await fetch(url) 
  const instrumentsResponseJSON = await instrumentsResponse.json()
  const allInstruments = instrumentsResponseJSON.data

  response.render('overzicht.liquid',{
    instruments: instrumentsResponseJSON.data
  });
});

app.get('/instrumenten/:id', async function (request, response) {
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
