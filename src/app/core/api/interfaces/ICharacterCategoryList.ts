export interface IResponseCategoryList {
  data: {
    characterName: string;
    characterDescription: string;
    characterThumb: string;
    seriesList: Array<IResponseStandardCategory>;
    eventsList: Array<IResponseStandardCategory>;
    storiesList: Array<IResponseStandardCategory>;
    comicsList: Array<IResponseStandardCategory>;
  };
}

export interface IResponseStandardCategory {
  id: number;
  thumb: string;
  enTitle: string;
}
