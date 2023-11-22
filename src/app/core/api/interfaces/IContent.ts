import { IContentCard } from 'src/app/pages/dash/home/interface/home.interface';

export interface IResponseContentByCategorie {
  date: string;
  status: boolean;
  data: IContentCard[];
}
