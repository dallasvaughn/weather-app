import express, { Request, Response } from 'express';
import { Location } from '../models/location';

const router = express.Router();

router.get('/api/locations/saved', async (req: Request, res: Response) => {
  const locations = await Location.find({});

  res.send(locations);
});

export { router as indexLocationRouter };
