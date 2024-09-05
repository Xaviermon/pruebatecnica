export interface ICharacter extends Document {
  _id?: number;
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: boolean;
}

export interface IUser extends Document {
  username: string;
  password: string;
}
