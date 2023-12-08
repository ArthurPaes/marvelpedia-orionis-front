import { EnumContentCategory } from 'src/app/core/api/interfaces/IMarvelContent';

export interface IComment {
  id: number;
  userName: string;
  userLastName: string;
  comment: string;
  createdAt: string;
  categoryId: number;
  category: string;
  userComment: boolean;
}

export interface IDataContent {
  categoryContent: EnumContentCategory;
  idContent: number;
}

export interface IResponsePosters {
  data: Array<IResponseStandardPoster>;
}

export interface IResponseStandardPoster {
  fullName: string;
  artSampleURL: string;
}
