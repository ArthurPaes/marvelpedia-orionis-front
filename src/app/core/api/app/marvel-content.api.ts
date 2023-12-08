import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseCategoryList } from '../interfaces/ICharacterCategoryList';
import {
  IResponseContentByCategory,
  IResponseTogleFavoriteCharacter,
  EnumContentCategory,
  IResponseGetCommentsByCategoryId,
  IResponseCreateUserComment,
  IResponseDeleteUserComment,
} from '../interfaces/IMarvelContent';

@Injectable({
  providedIn: 'root',
})
export class MarvelContentApi {
  private apiUrl = `${process.env.NG_APP_API_BASE_URL}`;

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
    category: string,
  ): Promise<IResponseCategoryList> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/${category}/${characterId}`,
      'GET',
    );
  }

  /**
   * toggleFavoriteCharacter
   *
   * Adiciona ou remove um personagem na lista de favoritos no usuário. Envia um objeto no body da requisição com o conteúdo do ID.
   * @param characterId - recebe um objeto contendo o ID do personagem a ser adicionado ou removido dos favoritos.
   * @returns Uma Promise contendo uma string informando o id do usuário e o id do personagem que foi adicionado/removido da lista de favoritos.
   */
  async togleFavoriteCharacter(
    characterId: object,
  ): Promise<IResponseTogleFavoriteCharacter> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/favorite`,
      'POST',
      characterId,
    );
  }

  /**
   * getCommentsByCategory
   *
   * Obtém o conteúdo ao qual será exibido os detalhes
   * A categoria pode ser uma das seguintes: 'characters', 'comics', 'series', 'stories', 'favorites', 'events'.
   * @param category - A categoria do conteúdo que será exibido.
   * @param categoryId - Id do conteúdo que será exibido.
   * @param page - Uma string de pesquisa opcional para filtrar os resultados.
   * @returns retorna uma Promise contendo um array objetos contendo os comentários da categoria especificada e o número total de comentários.
   */
  async getCommentsByCategoryId(
    category: EnumContentCategory,
    categoryId: number,
    page: number,
  ): Promise<IResponseGetCommentsByCategoryId> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/comments/${category}/${categoryId}/?page=${page}`,
      'GET',
    );
  }
  /**
   * deleteComment
   *
   * Deleta o comentário a partir de seu ID.
   * @param commentId -Número que identifica o comentário.
   */
  async deleteUserComment(
    commentId: number,
  ): Promise<IResponseDeleteUserComment> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/comments/${commentId}`,
      'DELETE',
    );
  }

  async createUserComment(
    category: EnumContentCategory,
    categoryId: number,
    newComment: object,
  ): Promise<IResponseCreateUserComment> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/comments/${category}/${categoryId}`,
      'POST',
      newComment,
    );
  }
}
