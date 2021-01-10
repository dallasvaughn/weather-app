import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@dsvtickets/common';
import { body } from 'express-validator';
import { Location } from '../models/location';
import { LocationSavedPublisher } from '../events/location-saved-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/locations',
  requireAuth,
  [body('latitude').isFloat(), body('longitude').isFloat()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { latitude, longitude, city, state } = req.body;

    const location = Location.build({
      latitude,
      longitude,
      city,
      state,
      userId: req.currentUser!.id,
    });
    await location.save();
    new LocationSavedPublisher(natsWrapper.client).publish({
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      state: location.state,
      userId: location.userId,
    });

    res.status(201).send(location);
  }
);

export { router as saveLocationRouter };
