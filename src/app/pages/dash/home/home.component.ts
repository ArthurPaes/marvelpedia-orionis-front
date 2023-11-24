import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { IContentCard } from './interface/home.interface';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';
import { EnumContentCategory } from 'src/app/core/api/interfaces/IMarvelContent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private marvelContentApi: MarvelContentApi,
    private router: Router,
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
  content: IContentCard[] = [];
  notFoundMessage = false;
  seeMoreButton = true;
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
      this.notFoundMessage = false;
      this.seeMoreButton = true;
      // Caso não tenha mais conteúdo disponível para buscar, remove o botão "Ver mais" da página
      if (response.data.length < 9) {
        this.seeMoreButton = false;
      }
      this.content = this.content.concat(response.data);
    } catch (error) {
      this.seeMoreButton = false;
      this.notFoundMessage = true;
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
   * Limpa a lista de 'content', reinicia a paginação e ativa o botão "CONHECER MAIS"
   */
  searchContent(): void {
    this.content = [];
    this.pageNumber = 1;
    this.seeMoreButton = false;
    this.category = this.categoryInputValue;
    this.search = this.searchInputValue;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
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
