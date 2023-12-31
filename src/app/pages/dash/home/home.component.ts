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
  loading = false;
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
  notFoundMessage = false;
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
    this.loading = true;
    this.serviceGetContent(
      this.category,
      this.pageNumber,
      this.searchInputValue,
    );
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
    if (categoryContent === 'favorites') {
      categoryContent = 'characters';
    }

    const dataToTransfer = {
      state: {
        idContent: idContent,
        categoryContent: categoryContent,
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
      this.notFoundMessage = false;
      this.seeMoreButton = true;
      // Caso não tenha mais conteúdo disponível para buscar, ou a categoria selecionada seja 'Favoritos', remove o botão "Conhecer Mais'".
      if (category === 'favorites' || response.data.length < 9) {
        this.seeMoreButton = false;
      }

      this.contentList = this.contentList.concat(response.data);
      this.loading = false;
    } catch (error) {
      this.seeMoreButton = false;
      this.loading = false;
      this.notFoundMessage = true;
    }
  }

  /**
   * seeMoreContent() {
   *
   * Exibe mais 9 cards a cada vez que o botão "CONHECER MAIS" é clicado.
   */
  seeMoreContent(): void {
    this.pageNumber++;
    this.loading = true;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }

  /**
   * searchContent
   *
   * Realiza uma busca por conteúdo com base nos filtros.
   * Limpa a lista de 'contentList', reinicia a paginação e desativa o botão "CONHECER MAIS"
   */
  searchContent(): void {
    this.loading = true;
    this.contentList = [];
    this.pageNumber = 1;
    this.seeMoreButton = false;
    this.category = this.categoryInputValue;
    this.search = this.searchInputValue;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }

  /**
   * clearSearchCategory
   *
   * Função que pega um evento de limpar do componente input e reseta a busca de cards.
   * @param isClean evento boleano emitido pelo componente input
   */
  clearSearchCategory(isClean: boolean): void {
    if (isClean) {
      this.searchInputValue = '';
    }
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
    try {
      const character: ICharacter = { character_id: selectedCharacterId };
      await this.marvelContentApi.togleFavoriteCharacter(character);
      this.toastMessage = selectedCharacterIsFavorited
        ? `${selectedCharacterName} adicionado(a) aos favoritos!`
        : `${selectedCharacterName} removido(a) dos favoritos!`;

      this.openSnackBar(`${this.toastMessage}`, 'Fechar');

      if (this.category === 'favorites') {
        this.contentList = this.contentList.filter(
          (item) => item.id !== character.character_id,
        );
      }
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
