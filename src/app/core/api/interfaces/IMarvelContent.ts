import { IContentCard } from 'src/app/pages/dash/home/interface/home.interface';
import { IComment } from 'src/app/pages/dash/media-explorer/interface/media-explorer';

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

export interface IResponseGetCommentsByCategoryId {
  date: string;
  status: boolean;
  data: {
    totalComments: number;
  };
  commentsWithUserComment: IComment[];
}

export interface IResponseDeleteUserComment {
  date: string;
  status: boolean;
  data: string;
}

export interface IResponseCreateUserComment {
  date: string;
  status: boolean;
  data: string;
}

export interface IReponseGetDetailsCategory {
  date: string;
  status: boolean;
  data: {
    description: string;
    title: string;
    thumb: string;
    link: string;
  };
}

export interface IResponseSendEmailPayment {
  date: string;
  status: boolean;
  data: number;
}
