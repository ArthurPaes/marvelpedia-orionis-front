export interface IContentCard {
  createdAt: Date;
  description: string;
  enName: string;
  enTitle: string;
  id: number;
  idMarvel: number;
  isTranslated: true;
  favorited: boolean;
  ptName: string;
  thumb: string;
}

export interface ICharacter {
  character_id: number;
}
