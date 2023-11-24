import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { IContentCard } from './interface/home.interface';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { EnumContentCategory } from 'src/app/core/api/interfaces/IMarvelContent';
import { ICharacter } from './interface/home.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  pageNumber = 1;
  categoryInputValue = EnumContentCategory.Characters;
  searchInputValue = '';
  category = EnumContentCategory.Characters;
  search = '';
  optionList = [
    'Personagens',
    'Quadrinhos',
    'Séries',
    'Histórias',
    'Favoritos',
    'Eventos',
  ];
  contentList: IContentCard[] = [];
  seeMoreButton = true;
  toastMessage = '';
  defaultCardDescription =
    'Venha conhecer um pouco mais sobre este conteúdo exclusivo da Marvel. Aproveite para acessar outros materiais relacionados em "Saber mais"!';

  /**
   * ngOnInit
   *
   * Inicializa o componente, chamando o service para carregar o conteúdo da página inicial, no caso, personagens.
   */
  ngOnInit(): void {
    this.serviceGetContent(
      this.category,
      this.pageNumber,
      this.searchInputValue,
    );
  }

  /**
   * translateCategory
   *
   * Traduz a categoria em português para inglês, da forma que o backend espera no momento do request.
   * @param categoryInPortuguese - Categoria a ser convertida para inglês.
   * @returns Categoria em inglês.
   */
  private translateCategory(categoryInPortuguese: string): EnumContentCategory {
    const categoryMap: Record<string, EnumContentCategory> = {
      personagens: EnumContentCategory.Characters,
      eventos: EnumContentCategory.Events,
      quadrinhos: EnumContentCategory.Comics,
      séries: EnumContentCategory.Series,
      histórias: EnumContentCategory.Stories,
      favoritos: EnumContentCategory.Favorites,
    };

    const translatedCategory = categoryMap[categoryInPortuguese.toLowerCase()];
    return translatedCategory;
  }

  /**
   * onCategoryChange
   *
   * Manipula a mudança no select de categorias.
   * @param optionCategory - Categoria selecionada.
   */
  onCategoryChange(optionCategory: string): void {
    //Extrai o nome da categoria e ignora o número e dois pontos que é implementado pelo componente select.
    const categoryInPortuguese = optionCategory.slice(3);
    this.categoryInputValue = this.translateCategory(categoryInPortuguese);
  }

  /**
   * onSearchChange
   *
   * Manipula a mudança no input de texto da pesquisa.
   * @param search - Texto da pesquisa feita pelo usuário.
   */
  onSearchChange(search: string): void {
    this.searchInputValue = search;
  }

  /**
   * serviceGetContent
   *
   * Busca o conteúdo com base na categoria, página e texto da pesquisa.
   * A cada página são exibidos mais 9 cards.
   *
   * @param category - Categoria do conteúdo.
   * @param page - Número da página a ser exibida.
   * @param search - Texto da pesquisa.
   */
  async serviceGetContent(
    category: EnumContentCategory,
    page: number,
    search: string,
  ): Promise<void> {
    try {
      const response = await this.marvelContentApi.getContentByCategory(
        category,
        page,
        search,
      );
      this.seeMoreButton = true;
      console.log(response.data);
      // Caso não tenha mais conteúdo disponível para buscar, ou a categoria selecionada seja 'Favoritos', remove o botão "Conhecer Mais'".
      if (category === 'favorites' || response.data.length < 9) {
        this.seeMoreButton = false;
      }

      this.contentList = this.contentList.concat(response.data);
    } catch (error) {
      this.seeMoreButton = false;
      console.error(error);
    }
  }

  /**
   * seeMoreContent() {
   *
   * Exibe mais 9 cards a cada vez que o botão "CONHECER MAIS" é clicado.
   */
  seeMoreContent(): void {
    this.pageNumber++;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }

  /**
   * searchContent
   *
   * Realiza uma busca por conteúdo com base nos filtros.
   * Limpa a lista de 'contentList', reinicia a paginação e desativa o botão "CONHECER MAIS"
   */
  searchContent(): void {
    this.contentList = [];
    this.pageNumber = 1;
    this.seeMoreButton = false;
    this.category = this.categoryInputValue;
    this.search = this.searchInputValue;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }

  /**
   * toggleFavorite
   *
   * Alterna o status de favorito de um personagem. Adiciona ou remove um personagem da lista de favoritos.
   * Se a categoria atual for "Favoritos", atualiza a lista de conteúdo exibida na página, removendo o personagem da lista.
   *
   @param selectedCharacterIsFavorited - Indica se o personagem selecionado está sendo favoritado ou não favoritado pelo usuário.
   @param selectedCharacterId - O ID do personagem selecionado, enviado em forma de objeto para o backend.
   @param selectedCharacterName - O nome do personagem selecionado. O nome será exibido no toast indicando se o personagem foi adionado ou removido da lista de favoritos.
   */
  async toggleFavorite(
    selectedCharacterIsFavorited: boolean,
    selectedCharacterId: number,
    selectedCharacterName: string,
  ): Promise<void> {
    const character: ICharacter = { character_id: selectedCharacterId };
    try {
      await this.marvelContentApi.togleFavoriteCharacter(character).then(() => {
        this.toastMessage = selectedCharacterIsFavorited
          ? `${selectedCharacterName} adicionado(a) aos favoritos!`
          : `${selectedCharacterName} removido(a) dos favoritos!`;

        this.openSnackBar(`${this.toastMessage}`, 'Fechar');

        if (this.category === 'favorites') {
          this.contentList = this.contentList.filter(
            (item) => item.id !== character.character_id,
          );
        }
      });
    } catch (error) {
      this.toastMessage = `Erro ao executar ação!`;
      this.openSnackBar(`${this.toastMessage}`, 'Fechar');
    }
  }

  /**
   * openSnackBar
   *
   * Abre um componente de Snackbar do Angular Material exibindo uma mensagem para o usuário e um botão de ação.
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duração em milissegundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-1'],
    });
  }

  /**
   * userLogout
   *
   * Realiza o logout do usuário, removendo o token de autenticação e redirecionando para a página de login.
   */
  userLogout(): void {
    localStorage.removeItem('@authToken');
    this.router.navigate(['/login']);
  }
}
