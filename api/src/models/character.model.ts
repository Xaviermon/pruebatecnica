import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICharacter extends Document {
  _id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: boolean;
}

const CharacterSchema: Schema<ICharacter> = new Schema({
  _id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  species: { type: String, required: true },
  type: { type: String, default: "" },
  gender: { type: String, required: true },
  image: { type: String, required: true },
  created: { type: Boolean, required: true },
});

const Character: Model<ICharacter> = mongoose.model<ICharacter>(
  "Character",
  CharacterSchema
);

export default Character;
