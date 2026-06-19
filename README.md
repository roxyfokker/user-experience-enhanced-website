
# Enhanced website
Ontwerp en maak een interactieve website die snel laadt en prettig te gebruiken is.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Licentie](#licentie)

## Beschrijving

Voor Cool Kunst en Cultuur is een digitale instrumentenuitleentool ontwikkeld waarmee docenten en administratie realtime inzicht krijgen in de instrumentenvoorraad van het Prelude Fonds. De focus lag op usability en performance: snelle laadtijden, duidelijke navigatie en client-side scripting om de interface efficiënter en prettiger in gebruik te maken.

<img width="100" height="120" alt="image" src="https://github.com/user-attachments/assets/06e2afe6-c723-4791-a58e-3d58d673e410" />

<img width="1920" height="1652" alt="image" src="https://github.com/user-attachments/assets/22c78fc2-64dc-4555-82da-7d0dd5827a8c" />
<img width="1920" height="1049" alt="Screenshot 2026-06-19 at 10-25-19 PreludeFonds" src="https://github.com/user-attachments/assets/a9869c2c-83cb-459c-9b1e-fb8ee38f71ef" />
<img width="492" height="1105" alt="image" src="https://github.com/user-attachments/assets/2855dca1-b877-4e1b-bc44-f16ff555fc4f" />
<img width="1460" height="1175" alt="image" src="https://github.com/user-attachments/assets/b1bf165a-4d11-423a-9067-7ae9f5ce5b17" />


### Commit-conventies
 
```
type: beschrijving #issuenummer [wip]
```
 
`[wip]` is optioneel en geeft aan dat het werk nog niet af is.
 
| Type | Gebruik |
|---|---|
| `feat` | Nieuwe functionaliteit |
| `fix` | Bug opgelost |
| `style` | Styling |
| `refactor` | Code verbeterd |
| `docs` | Documentatie |
| `test` | Testen |
| `chore` | Kleine technische aanpassingen |
 

https://user-experience-enhanced-website-sprint-ggzc.onrender.com

## Gebruik

### Pagina's

De website bestaat uit de volgende pagina's:

Dashboard (/)
De startpagina toont een persoonlijk welkomstwoord (goedemorgen / goedemiddag / goedenavond, afhankelijk van het tijdstip) en een statistiekenoverzicht van de volledige instrumentenvoorraad: totaal aantal instrumenten, hoeveel er van het Prelude Fonds zijn, hoeveel extern, en de aantallen en percentages per status (beschikbaar, uitgeleend, in reparatie). Daaronder staat een preview van de meest recent toegevoegde instrumenten.

Instrumentenoverzicht (/instrumenten) 
Een overzicht van alle instrumenten in het systeem. Instrumenten zijn filterbaar op specifiek type (bijv. elektrische gitaar, niet alleen gitaar), op verzoek van de opdrachtgever. Na het toevoegen van een instrument verschijnt het bovenaan met een groene highlight en een bevestigingsmelding.

Detailpagina (/instrumenten/:id) 
Toont alle informatie over één instrument, inclusief foto, status en actieknoppen. Afhankelijk van de huidige status zijn de knoppen Uitlenen, Innemen en Schade melden beschikbaar. Bij elke statuswijziging worden extra gegevens meegestuurd, zoals studentnaam, docentnaam en notities.

Instrument toevoegen
Via een formulier op het overzicht kan een nieuw instrument worden toegevoegd met naam, type, merk, serienummer, categorie, eigendom, locatie en beschrijving. Het instrument krijgt automatisch de status Beschikbaar en een gegenereerde sleutel op basis van de naam.

User stories

> Als beheerder (Meike / Bianca) wil ik een nieuw instrument kunnen toevoegen via een formulier, zodat het direct zichtbaar is in het overzicht.

> Als docent wil ik op een laagdrempelige manier een instrument kunnen uitlenen of innemen via de QR-code.

> Als docent of beheerder wil ik schade kunnen registreren aan een instrument.

> Als beheerder wil ik in één oogopslag kunnen zien hoeveel instrumenten er zijn en wat de status ervan is, zodat ik dit kan bespreken in de maandelijkse meeting.

## Kenmerken

Deze interactieve toepassing is gebouwd met **Node.js**, **Express**, **Liquid**, **Directus** en **client-side JavaScript**.
 
| Technologie | Gebruik |
|---|---|
| Node.js + Express | Server en routing |
| Liquid | Templates en server-side rendering |
| Directus API | Database — instrumentendata |
| Client-side JavaScript | Filters, button states, interactie |

### Routes
 
| Method | Route | Beschrijving |
|---|---|---|
| GET | `/` | Dashboard met statistieken |
| GET | `/instrumenten` | Overzicht van alle instrumenten |
| GET | `/instrumenten/:id` | Detailpagina van één instrument |
| POST | `/instrumenten` | Nieuw instrument toevoegen |
| POST | `/instrumenten/:id/uitlenen` | Status → Uitgeleend |
| POST | `/instrumenten/:id/innemen` | Status → Beschikbaar |
| POST | `/instrumenten/:id/schade` | Status → In reparatie |

### Performance — afbeeldingen
Om de performance vna de website te verbeteren is er gebruik gemaakt van performaned images 

```html
<picture>
  <source type="image/avif"
    srcset="...?format=avif&width=400 400w,
            ...?format=avif&width=800 800w,
            ...?format=avif&width=1200 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
  >
  <source type="image/webp"
    srcset="...?format=webp&width=400 400w,
            ...?format=webp&width=800 800w,
            ...?format=webp&width=1200 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
  >
  <img
    src="...?width=800&quality=70"
    width="{{ instruments.photo.width }}"
    height="{{ instruments.photo.height }}"
    alt="{{ instruments.name }}"
  >
</picture>
```

De browser kiest automatisch het meest geschikte formaat via een `<picture>` element met `<source>` voor AVIF en WebP, met JPEG als fallback.

Expliciete `width` en `height` attributen op `<img>` voorkomen layout shifts (CLS) doordat de browser ruimte reserveert voor de afbeelding nog vóór die geladen is.

### Performance — fonts
 
Het meest gebruikte font wordt via een `<link rel="preload">` alvast ingeladen zodat tekst niet later zichtbaar wordt. In de `@font-face` declaratie wordt `font-display: swap` gebruikt, waardoor de browser direct met een systeemfont toont en overschakelt zodra het custom font beschikbaar is.


## Installatie

1. Ga naar [nodejs.org](https://nodejs.org) en installeer **Node.js 24.13.0 LTS** (Long Term Support).
2. Fork de repository en open het project in VSCodium.
3. Open de terminal in VSCodium en voer het volgende commando uit:
```bash
   npm install
```
4. Start het project met:
```bash
   npm start
```
   Het project is nu bereikbaar op **http://localhost:8000**.
5. Wanneer je klaar bent, stop je de server met **Control + C** in de terminal.

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
