import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IRequestRating, IResponseRating } from '../interfaces/IRating';

@Injectable()
export class RatingApi {
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
      'http://localhost:4444/survey',
      'POST',
      ratingData,
    );
    return response;
  }
}
