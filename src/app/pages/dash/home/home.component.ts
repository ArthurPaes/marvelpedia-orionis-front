import { Component, OnInit } from '@angular/core';
import type { IContentCard } from './interface/home.interface';
import { ContentApi } from 'src/app/core/api/app/content.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private contentApi: ContentApi) {}

  pageNumber = 1;
  category = 'characters';
  search = '';
  optionList = ['Personagens', 'Eventos', 'Quadrinhos', 'Séries'];
  content: IContentCard[] = [];
  seeMoreButton = true;
  defaultContentDescription =
    'Venha conhecer um pouco mais sobre este conteúdo exclusivo da Marvel. Aproveite para acessar outros materiais relacionados em "Saber mais"!';

  /** Mapeia as traduções das categorias */
  categoryTranslation: Record<string, string> = {
    Personagens: 'characters',
    Eventos: 'events',
    Quadrinhos: 'comics',
    Séries: 'series',
  };

  /**
   * ngOnInit
   *
   * Inicializa o componente, chamando o service para carregar o conteúdo da página inicial, no caso, personagens.
   */
  ngOnInit(): void {
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }

  /**
   * translateCategory
   *
   * Traduz a categoria em português para inglês, da forma que o backend espera no momento do request.
   * @param category - Categoria a ser convertida para inglês.
   * @returns Categoria em inglês.
   */
  translateCategory(category: string): string {
    if (category in this.categoryTranslation) {
      return this.categoryTranslation[category];
    } else {
      return category;
    }
  }

  /**
   * onCategoryChange
   *
   * Manipula a mudança no select de categorias.
   * @param option - Categoria selecionada.
   */
  onCategoryChange(option: string): void {
    //Extrai o nome da categoria e ignora o número e dois pontos que é implementado pelo componente select.
    const categoryInPortuguese = option.slice(3);
    this.category = this.translateCategory(categoryInPortuguese);
  }

  /**
   * Manipula a mudança no input de texto da pesquisa.
   *
   * @param search - Texto da pesquisa feita pelo usuário.
   */
  onSearchChange(search: string): void {
    this.search = search;
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
  serviceGetContent(category: string, page: number, search: string): void {
    this.contentApi
      .getContent(category, page, search)
      .then((response) => {
        // Caso não tenha mais conteúdo disponível para buscar, remove o botão "Ver mais" da página
        if (response.data.length < 9) {
          this.seeMoreButton = false;
        }
        this.content = this.content.concat(response.data);
      })
      .catch((error) => {
        this.seeMoreButton = false;
        console.log(error);
      });
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
  searchContent() {
    this.content = [];
    this.pageNumber = 1;
    this.seeMoreButton = true;
    this.serviceGetContent(this.category, this.pageNumber, this.search);
  }
}
