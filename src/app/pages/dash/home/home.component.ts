import { Component, OnInit } from '@angular/core';
import type { IContentCard } from './interface/home.interface';
import { MarvelContentApi } from 'src/app/core/api/app/marvel-content.api';

export enum EnumContentCategory {
  Characters = 'characters',
  Comics = 'comics',
  Series = 'series',
  Stories = 'stories',
  Favorites = 'favorites',
  Events = 'events',
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private marvelContentApi: MarvelContentApi) {}

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
    switch (categoryInPortuguese.toLowerCase()) {
      case 'personagens':
        return EnumContentCategory.Characters;
      case 'eventos':
        return EnumContentCategory.Events;
      case 'quadrinhos':
        return EnumContentCategory.Comics;
      case 'séries':
        return EnumContentCategory.Series;
      case 'histórias':
        return EnumContentCategory.Stories;
      case 'favoritos':
        return EnumContentCategory.Favorites;
      default:
        console.log(
          `Tradução não encontrada para a categoria: ${categoryInPortuguese}`,
        );
        return categoryInPortuguese as EnumContentCategory;
    }
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
   * Manipula a mudança no input de texto da pesquisa.
   *
   * @param search - Texto da pesquisa feita pelo usuário.
   */
  onSearchChange(search: string): void {
    this.searchInputValue = search;
  }

  /**
   * serviceGetCharacters
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
      const response = await this.marvelContentApi.getContentByCategorie(
        category,
        page,
        search,
      );

      // Caso não tenha mais conteúdo disponível para buscar, remove o botão "Ver mais" da página
      if (response.data.length < 9) {
        this.seeMoreButton = false;
      }

      this.content = this.content.concat(response.data);
    } catch (error) {
      this.seeMoreButton = false;
      console.error(error);
    }
  }

  /**
   * seeMoreCharacters() {
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
    this.seeMoreButton = true;
    this.category = this.categoryInputValue;
    this.search = this.searchInputValue;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }
}
