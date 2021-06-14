import { Model, Favorite } from '.';

export interface Category extends Model {
  name: string;
  is_pinned: boolean;
  favorites: Favorite[];
}

export interface NewCategory {
  name: string;
}
