export interface IUser {
  id: number | string;
  name: string;
  username: string;
  password: string;
  bio: string;
  location: string;
  pronouns: string;
  user_img: string;
  bg_color: string;
}
export interface IPost {
  id: number | string;
  content: string;
  created: number;
  added_by: number | string;
  likes: (string | number)[];
}
export interface IReview {
  id: number | string;
  content: string;
  rating: number;
  created: number;
  added_by: number | string;
  pkmn: number;
  likes: (string | number)[];
}
export interface IReply {
  id: number | string;
  content: string;
  created: number;
  added_by: number | string;
  for: string;
  forId: number;
}
export interface ITeam {
  id: number | string;
  name: string;
  members: (string | number)[];
  likes: (string | number)[];
  added_by: number | string;
  created: number;
  [key: string]: any;
}
export interface ILike {
  postType: string;
  user: number | string;
  forId: number | string;
}
export interface IPokemon {
  id: number;
  name: string;
  gen: number;
  types: string[];
  sprite_url: string;
  art_url: string;
  shiny_url: string;
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
  favorited_by: (string | number)[];
  weak_to: string[];
  resists: string[];
  immune_to: string[];
}
export interface IType {
  id: number;
  name: string;
  pkmn?: number[];
  weak_to: string[];
  resists: string[];
  immune_to: string[];
}
export interface IRTable {
  [key: string]: {
    weak: number;
    resist: number;
    immune: number;
  };
}
export interface ISTable {
  [key: string]: number;
}
export interface IRegistrationObject {
  name: string;
  username: string;
  password: string;
  confirm?: string;
}
