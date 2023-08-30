import { Router, Response, Request } from 'express';
import { forecast } from '../utils/forecast.js';
import { geocode } from '../utils/geocode.js';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

router.get('/about', (req: Request, res: Response) => {
  res.render('about');
});

router.get('/help', (req: Request, res: Response) => {
  res.render('help');
});

router.get('/weather', async (req: Request, res: Response) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!',
    });
  }

  const address = req.query.search as string;

  try {
    const { longitude, latitude, location } = await geocode(address);
    const forecastData = await forecast(latitude, longitude);

    res.send({
      coords: { longitude, latitude },
      location,
      forecast: forecastData,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get('*', (req: Request, res: Response) => {
  res.render('error', {
    message: '404 - page not found :(',
  });
});
