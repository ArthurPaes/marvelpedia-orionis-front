import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { environment } from 'src/environments/environment';
import { IResponseCategoryList } from '../interfaces/ICharacterCategoryList';

@Injectable({
  providedIn: 'root',
})
export class MarvelContentApi {
  private apiUrl = `${environment.API_BASE_URL}`;

  constructor(private httpRequestService: HttpRequestService) {}

  async getCharacters(page: number): Promise<any> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/characters?page=${page}`,
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
