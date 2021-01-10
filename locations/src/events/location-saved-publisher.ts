import { Publisher, Subjects, LocationSavedEvent } from '@dsvtickets/common';

export class LocationSavedPublisher extends Publisher<LocationSavedEvent> {
  readonly subject = Subjects.LocationSaved;
}
