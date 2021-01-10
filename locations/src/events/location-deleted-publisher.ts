import { Publisher, Subjects, LocationDeletedEvent } from '@dsvtickets/common';

export class LocationDeletedPublisher extends Publisher<LocationDeletedEvent> {
  readonly subject = Subjects.LocationDeleted;
}
