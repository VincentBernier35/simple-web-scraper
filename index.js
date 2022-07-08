/* 
- axios => Bibliothèque js fonctionnant comme un client HTTP. Elle permet de communiquer avec des API en utilisant des requêtes.
- cheerio => Librairie permettant d'analyser le contenu d'une page HTML pour accéder facilement à des éléments ou des textes de cette page.
*/
require('dotenv').config()

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const myUrl = 'https://www.theguardian.com/uk';

axios(myUrl)
  .then(response => {
    const html = response.data;
    const $  = cheerio.load(html);
    const articles = [];

    $('.fc-item__title', html).each(function() {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');
      articles.push({
        title,
        url
      })
    })
    console.log(articles)
  }).catch(err => console.log(err))


//LANCEMENT DU SERVEUR
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
   console.log(`\x1b[1;33m\u26a1Running server on : http://localhost:${PORT} \u26a1\x1b[0m`);
});
