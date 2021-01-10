import express, { Request, Response } from 'express';
import { Location } from '../models/location';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@dsvtickets/common';
import { LocationDeletedPublisher } from '../events/location-deleted-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/locations/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const location = await Location.findById(req.params.id);

    if (!location) {
      throw new NotFoundError();
    }

    await location.remove();

    // publish an event saying this saved location is now deleted
    new LocationDeletedPublisher(natsWrapper.client).publish({
      latitude: location.latitude,
      longitude: location.longitude,
      city: location.city,
      state: location.state,
      userId: location.userId,
    });

    res.status(204).send(location);
  }
);

export { router as deleteLocationRouter };
