import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import {
  IResponseCategoryList,
  IResponseStandardCategory,
} from 'src/app/core/api/interfaces/ICharacterCategoryList';
import mock from './mock';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
// export class CharacterDetailsComponent implements OnInit {
export class CharacterDetailsComponent {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private activatedRoute: ActivatedRoute,
  ) {}

  public characterId = mock.characterId;
  public characterDetailList: IResponseCategoryList = {
    characterName: mock.characterName,
    characterDescription: mock.characterDescription,
    seriesList: mock.seriesList,
    comicsList: mock.comicsList,
    eventsList: mock.eventsList,
    storiesList: mock.storiesList,
  };

  public seriesListFilter = mock.seriesList;
  public comicsListFilter = mock.comicsList;
  public eventsListFilter = mock.eventsList;
  public storiesListFilter = mock.storiesList;

  /**
   * getCategoryList
   *
   * Quando o usuário vier da página home ao clicar no card, essa função irá receber o id do personagem como parâmetro da URL ao inicializar a página, e irá solicitar ao backend informações que irão compor a página de detalhes como dados do cabeçalho e arrays de quadrinhos, histórias, séres e eventos.
   */
  // getCategoryList(): void {
  //   const characterIdParams: string | null =
  //     this.activatedRoute.snapshot.paramMap.get('id');
  //   if (characterIdParams != null) {
  //     this.characterId = characterIdParams;
  //   }
  //   this.marvelContentApi
  //     .getCharacterCategoryList(this.characterId)
  //     .then((characterDetailsDataList) => {
  //       this.characterDetailList = characterDetailsDataList;
  //     });
  // }

  /**
   * ngOnInit
   *
   * Ao inicializar a página será chamado a função getCategoryList para popular os componentes da página.
   */
  // ngOnInit(): void {
  //   this.getCategoryList();
  // }

  /**
   * cleanSearchSeries
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de series.
   * @param isClean evento boleano emitido pelo componente input
   */
  cleanSearchSeries(isClean: boolean) {
    if (isClean) {
      this.seriesListFilter = this.characterDetailList.seriesList;
    }
  }

  /**
   * cleanSearchComics
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de comics.
   * @param isClean evento boleano emitido pelo componente input
   */
  cleanSearchComics(isClean: boolean) {
    if (isClean) {
      this.comicsListFilter = this.characterDetailList.comicsList;
    }
  }

  /**
   * cleanSearchEvents
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de events.
   * @param isClean evento boleano emitido pelo componente input
   */
  cleanSearchEvents(isClean: boolean) {
    if (isClean) {
      this.eventsListFilter = this.characterDetailList.eventsList;
    }
  }

  /**
   * cleanSearchStories
   *
   * Função que pega um evento de limpar do componente input e reseta os cards de stories.
   * @param isClean evento boleano emitido pelo componente input
   */
  cleanSearchStories(isClean: boolean) {
    if (isClean) {
      this.storiesListFilter = this.characterDetailList.storiesList;
    }
  }

  /**
   * filterCategorySeries
   *
   * @param letter cada letra digitada no input de busca
   * @returns Array filtrado da categoria series conforme as palavras digitadas no input.
   */
  filterCategorySeries(letter: string): Array<IResponseStandardCategory> {
    if (letter.length == 0) {
      return (this.seriesListFilter = this.characterDetailList.seriesList);
    } else {
      return (this.seriesListFilter =
        this.characterDetailList.seriesList.filter((serie) =>
          letter
            .trim()
            .replace('  ', ' ')
            .split(' ')
            .every((word) =>
              serie.description.toLowerCase().includes(
                word
                  .normalize('NFC')
                  .replace(/\p{Diacritic}/gu, '')
                  .toLowerCase(),
              ),
            ),
        ));
    }
  }

  /**
   * filterCategoryComics
   *
   * @param letter cada letra digitada no input de busca
   * @returns Array filtrado da categoria comics conforme as palavras digitadas no input.
   */
  filterCategoryComics(letter: string): Array<IResponseStandardCategory> {
    if (letter.length == 0) {
      return (this.comicsListFilter = this.characterDetailList.comicsList);
    } else {
      return (this.comicsListFilter =
        this.characterDetailList.comicsList.filter((comic) =>
          letter
            .trim()
            .replace('  ', ' ')
            .split(' ')
            .every((word) =>
              comic.description.toLowerCase().includes(
                word
                  .normalize('NFC')
                  .replace(/\p{Diacritic}/gu, '')
                  .toLowerCase(),
              ),
            ),
        ));
    }
  }

  /**
   * filterCategoryEvents
   *
   * @param letter cada letra digitada no input de busca
   * @returns Array filtrado da categoria events conforme as palavras digitadas no input.
   */
  filterCategoryEvents(letter: string): Array<IResponseStandardCategory> {
    if (letter.length == 0) {
      return (this.eventsListFilter = this.characterDetailList.eventsList);
    } else {
      return (this.eventsListFilter =
        this.characterDetailList.eventsList.filter((event) =>
          letter
            .trim()
            .replace('  ', ' ')
            .split(' ')
            .every((word) =>
              event.description.toLowerCase().includes(
                word
                  .normalize('NFC')
                  .replace(/\p{Diacritic}/gu, '')
                  .toLowerCase(),
              ),
            ),
        ));
    }
  }

  /**
   * filterCategoryStories
   *
   * @param letter cada letra digitada no input de busca
   * @returns Array filtrado da categoria stories conforme as palavras digitadas no input.
   */
  filterCategoryStories(letter: string): Array<IResponseStandardCategory> {
    if (letter.length == 0) {
      return (this.storiesListFilter = this.characterDetailList.storiesList);
    } else {
      return (this.storiesListFilter =
        this.characterDetailList.storiesList.filter((storie) =>
          letter
            .trim()
            .replace('  ', ' ')
            .split(' ')
            .every((word) =>
              storie.description.toLowerCase().includes(
                word
                  .normalize('NFC')
                  .replace(/\p{Diacritic}/gu, '')
                  .toLowerCase(),
              ),
            ),
        ));
    }
  }
}
