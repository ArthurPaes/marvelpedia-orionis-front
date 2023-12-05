import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import {
  IResponseCategoryList,
  IResponseStandardCategory,
} from 'src/app/core/api/interfaces/ICharacterCategoryList';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    const data = this?.router?.getCurrentNavigation()?.extras?.state?.data;
  }

  public characterId = '';
  public characterDetailList: IResponseCategoryList = {
    characterName: '',
    characterDescription: '',
    seriesList: [],
    comicsList: [],
    eventsList: [],
    storiesList: [],
  };

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
   * filterCategory
   *
   * @param letter cada letra digitada no input de busca
   * @returns Array filtrado da categoria selecionada com as palavras digitadas no input.
   */
  filterCategory(
    letter: string,
    characterCategory: Array<IResponseStandardCategory>,
  ): Array<IResponseStandardCategory> {
    if (letter == '') {
      return characterCategory;
    } else {
      return characterCategory.filter((category) =>
        letter
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
          ),
      );
    }
  }
}
