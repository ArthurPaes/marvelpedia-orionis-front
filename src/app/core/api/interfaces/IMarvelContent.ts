import { IContentCard } from 'src/app/pages/dash/home/interface/home.interface';

export interface IResponseContentByCategory {
  date: string;
  status: boolean;
  data: IContentCard[];
}

export enum EnumContentCategory {
  Characters = 'characters',
  Comics = 'comics',
  Series = 'series',
  Stories = 'stories',
  Favorites = 'favorites',
  Events = 'events',
}

export interface IResponseTogleFavoriteCharacter {
  date: string;
  status: boolean;
  data: string;
}
