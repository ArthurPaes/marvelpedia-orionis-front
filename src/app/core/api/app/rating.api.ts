import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import {
  IRequestRating,
  IResponseRating,
  IResponseEligibility,
} from '../interfaces/IRating';
import { environment } from 'src/environments/environment';

@Injectable()
export class RatingApi {
  private apiUrl = process.env.NG_APP_API_BASE_URL;

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * registerRating

   * POST que será usada no componente Rating para avaliar a aplicação.
   *
     @param ratingData dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status, data e horário de retorno.
   */
  async registerRating(ratingData: IRequestRating): Promise<IResponseRating> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/survey/user_answer`,
      'POST',
      ratingData,
    );
    return response;
  }

  /**
   * validateEligibility

   * Função que irá verificar se o usuário é eligivel para realizar a pesquisa de satisfação.
   *
   * @returns retorna promise com o status true caso o usuário seja elegível e false não elegível.
   */
  async validateEligibility(): Promise<IResponseEligibility> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/survey/eligibility`,
      'GET',
    );
  }
}
