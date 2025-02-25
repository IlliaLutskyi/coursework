import mongoose, { Document, Model } from "mongoose";
export type TTrailer = {
  _id: string;
  trailer_key: string;
  trailer_site: string;
  trailer_type: string;
  official: boolean;
};
type TTrailerSchema = TTrailer & Document;
const TrailerSchema = new mongoose.Schema<TTrailerSchema>({
  _id: {
    type: String,
    required: true,
  },
  trailer_key: {
    type: String,
    required: true,
    unique: true,
  },
  trailer_site: {
    type: String,
    required: true,
  },
  trailer_type: {
    type: String,
    required: true,
  },
  official: {
    type: Boolean,
    required: true,
  },
});
export const Trailer: Model<TTrailerSchema> =
  mongoose.models.Trailer ??
  mongoose.model<TTrailerSchema>("Trailer", TrailerSchema);
