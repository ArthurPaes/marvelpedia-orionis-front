import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseContentByCategorie } from '../interfaces/IContent';
import { EnumContentCategory } from 'src/app/pages/dash/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class MarvelContentApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * getContentByCategorie
   *
   * Obtém o conteúdo da API com base na categoria especificada.
   * A categoria pode ser uma das seguintes: 'characters', 'comics', 'series', 'stories', 'favorites', 'events'.
   * @param category - A categoria do conteúdo desejado.
   * @param page - O número da página a ser exibida com o conteudo (a cada página são exibido até 9 cards).
   * @param search - Uma string de pesquisa opcional para filtrar os resultados.
   * @returns retorna uma Promise contendo um array objetos contendo os conteúdos da categoria especificada.
   */
  async getContentByCategorie(
    category: EnumContentCategory,
    page: number,
    search: string,
  ): Promise<IResponseContentByCategorie> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/${category}?page=${page}&search=${search}`,
      'GET',
    );
  }
}
