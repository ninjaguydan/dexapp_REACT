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
  members: number[];
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
export type PKMN_JSON = {
  id: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    [key: string]: any;
    other: { "official-artwork": { front_default: string; front_shiny: string }; [key: string]: any };
  };
  [key: string]: any;
};
export interface IType {
  id: number;
  name: string;
  pkmn?: number[];
  weak_to: string[];
  resists: string[];
  immune_to: string[];
}
export type TYPE_JSON = {
  damage_relations: {
    double_damage_from: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
  };
  id: number;
  name: string;
  [key: string]: any;
};
export const TYPE_LIST = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
};
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
