import mongoose from 'mongoose';

interface LocationAttrs {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  userId: string;
}

interface LocationDoc extends mongoose.Document {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  userId: string;
}

interface LocationModel extends mongoose.Model<LocationDoc> {
  build(attrs: LocationAttrs): LocationDoc;
}

const locationSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // change default _id property to simply 'id'
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

locationSchema.statics.build = (attrs: LocationAttrs) => {
  return new Location(attrs);
};

const Location = mongoose.model<LocationDoc, LocationModel>(
  'Location',
  locationSchema
);

export { Location };
