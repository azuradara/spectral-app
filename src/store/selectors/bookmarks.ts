import { Favorite, GlobalState } from '#interfaces';
import { createSelector } from 'reselect';

export const selectPinnedBookmarks = createSelector(
  (state: GlobalState) => state.favorite.categories,
  (categories) => {
    if (!categories.length) return [];
    return categories
      .map((c) => c.favorites)
      .reduce((x, y) => [...x, ...y])
      .filter((fav: Favorite) => fav.is_pinned == true);
  }
);
