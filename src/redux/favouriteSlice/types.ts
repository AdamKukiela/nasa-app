export type Favourite = {
  date: string;
  explanation?: string;
  media_type: string;
  service_version?: string;
  title: string;
  url: string;
};

export interface FavouritesState {
  items: Favourite[];
}
