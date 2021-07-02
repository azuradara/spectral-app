import { Model } from '.';

export interface Favorite extends Model {
  title: string;
  url: string;
  category_id: number;
  is_pinned: boolean;
}

export interface NewFavorite {
  title: string;
  url: string;
  category_id: number;
}
