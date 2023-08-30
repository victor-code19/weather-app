import express from 'express';
import { router } from './routers/routes';
import path from 'path';
import hbs from 'hbs';

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicFileDirectory = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine, views and partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicFileDirectory));

app.use(router);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
