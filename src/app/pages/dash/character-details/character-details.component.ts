import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import {
  IResponseCategoryList,
  IResponseStandardCategory,
} from 'src/app/core/api/interfaces/ICharacterCategoryList';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private activatedRoute: ActivatedRoute,
  ) {}

  public characterId = '';
  public characterDetailList: IResponseCategoryList = {
    characterName: '',
    characterDescription: '',
    seriesList: [],
    comicsList: [],
    eventsList: [],
    storiesList: [],
  };

  public seriesListFilter: Array<IResponseStandardCategory> = [];
  public comicsListFilter: Array<IResponseStandardCategory> = [];
  public eventsListFilter: Array<IResponseStandardCategory> = [];
  public storiesListFilter: Array<IResponseStandardCategory> = [];

  /**
   * getCategoryList
   *
   * Quando o usuário vier da página home ao clicar no card, essa função irá receber o id do personagem como parâmetro da URL ao inicializar a página, e irá solicitar ao backend informações que irão compor a página de detalhes como dados do cabeçalho e arrays de quadrinhos, histórias, séres e eventos.
   */
  getCategoryList(): void {
    const characterIdParams: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');
    if (characterIdParams != null) {
      this.characterId = characterIdParams;
    }
    this.marvelContentApi
      .getCharacterCategoryList(this.characterId)
      .then((characterDetailsDataList) => {
        this.characterDetailList = characterDetailsDataList;
      });
    this.seriesListFilter = this.characterDetailList.seriesList;
    this.comicsListFilter = this.characterDetailList.comicsList;
    this.eventsListFilter = this.characterDetailList.eventsList;
    this.storiesListFilter = this.characterDetailList.storiesList;
  }

  /**
   * ngOnInit
   *
   * Ao inicializar a página será chamado a função getCategoryList para popular os componentes da página.
   */
  ngOnInit(): void {
    this.getCategoryList();
  }

  carouselOptions: OwlOptions = {
    loop: false,
    skip_validateItems: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<span><</span>', '<span>></span>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  /**
   * clearSearchSeries
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de series.
   * @param isClean evento boleano emitido pelo componente input
   */
  clearSearchSeries(isClean: boolean): void {
    if (isClean) {
      this.seriesListFilter = this.characterDetailList.seriesList;
    }
  }

  /**
   * clearSearchComics
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de comics.
   * @param isClean evento boleano emitido pelo componente input
   */
  clearSearchComics(isClean: boolean): void {
    if (isClean) {
      this.comicsListFilter = this.characterDetailList.comicsList;
    }
  }

  /**
   * clearSearchEvents
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de events.
   * @param isClean evento boleano emitido pelo componente input
   */
  clearSearchEvents(isClean: boolean): void {
    if (isClean) {
      this.eventsListFilter = this.characterDetailList.eventsList;
    }
  }

  /**
   * clearSearchStories
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de stories.
   * @param isClean evento boleano emitido pelo componente input
   */
  clearSearchStories(isClean: boolean): void {
    if (isClean) {
      this.storiesListFilter = this.characterDetailList.storiesList;
    }
  }

  /**
   * compareInputValueWithWord
   *
   * função que compara se o valor digitado no input buscar bate com a descrição do card.
   *
   * @param inputValue cada letra digitada no input buscar
   * @param category objeto da categoria séries, histórias, quadrinhos ou eventos
   * @returns um boolean se a letra digitada deu match com a descrição do card.
   */
  compareInputValueWithWord(
    inputValue: string,
    category: IResponseStandardCategory,
  ): boolean {
    return inputValue
      .trim()
      .replace('  ', ' ')
      .split(' ')
      .every((word) =>
        category.description.toLowerCase().includes(
          word
            .normalize('NFC')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase(),
        ),
      );
  }

  /**
   * filterSeriesCategory
   *
   * @param inputValue cada letra digitada no input de busca
   * @returns Array filtrado da categoria series conforme as palavras digitadas no input.
   */
  filterSeriesCategory(inputValue: string): Array<IResponseStandardCategory> {
    if (inputValue.length == 0) {
      return (this.seriesListFilter = this.characterDetailList.seriesList);
    } else {
      return (this.seriesListFilter =
        this.characterDetailList.seriesList.filter((serie) =>
          this.compareInputValueWithWord(inputValue, serie),
        ));
    }
  }

  /**
   * filterComicsCategory
   *
   * @param inputValue cada letra digitada no input de busca
   * @returns Array filtrado da categoria comics conforme as palavras digitadas no input.
   */
  filterComicsCategory(inputValue: string): Array<IResponseStandardCategory> {
    if (inputValue.length == 0) {
      return (this.comicsListFilter = this.characterDetailList.comicsList);
    } else {
      return (this.comicsListFilter =
        this.characterDetailList.comicsList.filter((comic) =>
          this.compareInputValueWithWord(inputValue, comic),
        ));
    }
  }

  /**
   * filterEventsCategory
   *
   * @param inputValue cada letra digitada no input de busca
   * @returns Array filtrado da categoria events conforme as palavras digitadas no input.
   */
  filterEventsCategory(inputValue: string): Array<IResponseStandardCategory> {
    if (inputValue.length == 0) {
      return (this.eventsListFilter = this.characterDetailList.eventsList);
    } else {
      return (this.eventsListFilter =
        this.characterDetailList.eventsList.filter((event) =>
          this.compareInputValueWithWord(inputValue, event),
        ));
    }
  }

  /**
   * filterStoriesCategory
   *
   * @param inputValue cada letra digitada no input de busca
   * @returns Array filtrado da categoria stories conforme as palavras digitadas no input.
   */
  filterStoriesCategory(inputValue: string): Array<IResponseStandardCategory> {
    if (inputValue.length == 0) {
      return (this.storiesListFilter = this.characterDetailList.storiesList);
    } else {
      return (this.storiesListFilter =
        this.characterDetailList.storiesList.filter((storie) =>
          this.compareInputValueWithWord(inputValue, storie),
        ));
    }
  }
}
