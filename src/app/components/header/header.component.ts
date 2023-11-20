import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CharactersApi } from 'src/app/core/api/app/characters.api';
import { IResponseCategoryList } from 'src/app/core/api/interfaces/ICharacterCategoryList';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: Router,
    private location: Location,
    private charactersApi: CharactersApi,
    private activatedRoute: ActivatedRoute,
  ) {}

  @Input() width = '1205px';
  @Input() containerHeight = '153px';
  @Input() backgroundColor = '#000000';
  @Input() textColor = '#FFFFFF';
  @Input() showCloseButton = false;
  @Input() characterDescriptionWidth = '';
  @Input() characterDescriptionPositon = '';

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

  /**
   * backRoute
   *
   * Função que retorna uma página anterior ao que o usuário estava navegando.
   */
  backRoute(): void {
    this.location.back();
  }

  /**
   * redirectHome
   *
   * Função que redireciona o usuário para a página home ao clicar no botão fechar.
   */
  redirectHome(): void {
    this.route.navigate(['home']);
  }
}
