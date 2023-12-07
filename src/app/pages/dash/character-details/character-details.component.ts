import { Component, OnInit } from '@angular/core';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import {
  IResponseCategoryList,
  IResponseStandardCategory,
} from 'src/app/core/api/interfaces/ICharacterCategoryList';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private router: Router,
  ) {
    this.dataContent = this?.router?.getCurrentNavigation()?.extras?.state;
  }

  public dataContent: any = '';
  public standardCardTitle =
    'Venha conhecer um pouco mais sobre este conteúdo exclusivo da Marvel.';
  public standardCardThumb =
    '../../../../assets/images/personagem-sem-imagem.jpg';
  public standardErrorMessage = 'Não existem registros a serem exibidos!';

  public characterId = '';
  public characterDetailList: IResponseCategoryList = {
    data: {
      characterName: '',
      characterDescription: '',
      characterThumb: '',
      seriesList: [],
      comicsList: [],
      eventsList: [],
      storiesList: [],
    },
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
  async getCategoryList(): Promise<void> {
    this.characterId = this.dataContent.data.id;
    try {
      const characterDetailsDataList =
        await this.marvelContentApi.getCharacterCategoryList(
          this.characterId,
          'characters',
        );
      this.characterDetailList = characterDetailsDataList;
      this.seriesListFilter = this.characterDetailList.data.seriesList;
      this.comicsListFilter = this.characterDetailList.data.comicsList;
      this.eventsListFilter = this.characterDetailList.data.eventsList;
      this.storiesListFilter = this.characterDetailList.data.storiesList;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * ngOnInit
   *
   * Ao inicializar a página será chamado a função getCategoryList para popular os componentes da página.
   */
  ngOnInit(): void {
    this.getCategoryList();
  }

  /**
   * navigateToDetails
   *
   * Esta função navega para a rota de detalhes com os dados fornecidos.
   * Navega para a rota com os dados de Category e Name.
   * Se a categoria for 'favorites', ajusta para 'characters'.
   * Envia o id do conteúdo através do dataToTransfer.
   * @param categoryContent A categoria do card.
   * @param nameContent O nome do card.
   * @param idContent O id do card.
   */
  navigateToDetails(
    categoryContent: string,
    nameContent: string,
    idContent: number,
  ): void {
    const dataToTransfer = {
      state: {
        data: {
          id: idContent,
          category: categoryContent,
          name: nameContent,
        },
      },
    };

    this.router.navigate(
      [
        `${categoryContent}/${nameContent
          .replaceAll(' ', '')
          .replaceAll(/[()]/g, '')}`,
      ],
      dataToTransfer,
    );
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
      this.seriesListFilter = this.characterDetailList.data.seriesList;
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
      this.comicsListFilter = this.characterDetailList.data.comicsList;
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
      this.eventsListFilter = this.characterDetailList.data.eventsList;
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
      this.storiesListFilter = this.characterDetailList.data.storiesList;
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
      return (this.seriesListFilter = this.characterDetailList.data.seriesList);
    } else {
      return (this.seriesListFilter =
        this.characterDetailList.data.seriesList.filter((serie) =>
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
      return (this.comicsListFilter = this.characterDetailList.data.comicsList);
    } else {
      return (this.comicsListFilter =
        this.characterDetailList.data.comicsList.filter((comic) =>
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
      return (this.eventsListFilter = this.characterDetailList.data.eventsList);
    } else {
      return (this.eventsListFilter =
        this.characterDetailList.data.eventsList.filter((event) =>
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
      return (this.storiesListFilter =
        this.characterDetailList.data.storiesList);
    } else {
      return (this.storiesListFilter =
        this.characterDetailList.data.storiesList.filter((storie) =>
          this.compareInputValueWithWord(inputValue, storie),
        ));
    }
  }
}
