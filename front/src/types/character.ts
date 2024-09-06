export interface ICharacter{
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

export interface IUser{
  username: string;
  password: string;
}
