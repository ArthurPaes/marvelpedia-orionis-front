import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseCategoryList } from '../interfaces/ICharacterCategoryList';
import { IResponseContentByCategory } from '../interfaces/IMarvelContent';
import { EnumContentCategory } from '../interfaces/IMarvelContent';

@Injectable({
  providedIn: 'root',
})
export class MarvelContentApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * getContentByCategory
   *
   * Obtém o conteúdo da API com base na categoria especificada.
   * A categoria pode ser uma das seguintes: 'characters', 'comics', 'series', 'stories', 'favorites', 'events'.
   * @param category - A categoria do conteúdo desejado.
   * @param page - O número da página a ser exibida com o conteudo (a cada página são exibido até 9 cards).
   * @param search - Uma string de pesquisa opcional para filtrar os resultados.
   * @returns retorna uma Promise contendo um array objetos contendo os conteúdos da categoria especificada.
   */
  async getContentByCategory(
    category: EnumContentCategory,
    page: number,
    search: string,
  ): Promise<IResponseContentByCategory> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/${category}?page=${page}&search=${search}`,
      'GET',
    );
  }

  /**
   * getCharacterCategoryList
   *
   * Função que solicita dados para popular a página de detalhes dos personagens.
   *
   * @param characterId id do personagem que foi escolhido na tela de home.
   * @returns uma promise que em caso de sucesso traz os dados que serão inseridos na tela de detalhe dos personagens.
   */
  async getCharacterCategoryList(
    characterId: string,
  ): Promise<IResponseCategoryList> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/characters/${characterId}`,
      'GET',
    );
  }
}
