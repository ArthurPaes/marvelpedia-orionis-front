import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersApi } from 'src/app/core/api/app/characters.api';
import { IResponseCategoryList } from 'src/app/core/api/interfaces/ICharacterCategoryList';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  constructor(
    private charactersApi: CharactersApi,
    private activatedRoute: ActivatedRoute,
  ) {}

  public idCharacter = '';
  public CharacterDetailList: IResponseCategoryList = {
    characterName: '',
    characterDescription: '',
    seriesList: [],
    comicsList: [],
    eventsList: [],
    storiesList: [],
  };

  /**
   * ngOnInit
   *
   * Quando o usuário vier da página home ao clicar no card, essa função irá receber o id do personagem como parâmetro da URL ao inicializar a página, e irá solicitar ao backend informações que irão compor a página de detalhes como dados do cabeçalho e arrays de quadrinhos, histórias, séres e eventos.
   */
  ngOnInit(): void {
    const idCharacterParams: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');
    if (idCharacterParams != null) {
      this.idCharacter = idCharacterParams;
    }
    this.charactersApi.getCharacterCategoryList(this.idCharacter).then((dt) => {
      this.CharacterDetailList.characterName = dt.characterName;
      this.CharacterDetailList.characterDescription = dt.characterDescription;
      this.CharacterDetailList.seriesList = dt.seriesList;
      this.CharacterDetailList.comicsList = dt.comicsList;
      this.CharacterDetailList.eventsList = dt.eventsList;
      this.CharacterDetailList.storiesList = dt.storiesList;
    });
  }
}
