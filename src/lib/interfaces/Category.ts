import { Model, Favorite } from '.';

export interface Category extends Model {
  name: string;
  favorites: Favorite[];
}

export interface NewCategory {
  name: string;
}
