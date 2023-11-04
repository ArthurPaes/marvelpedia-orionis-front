//Adicionar endpoints de autenticação
import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IResponseRedirect } from '../interfaces/IRedirect';

@Injectable()
export class redirectApi {
  constructor(private httpRedirect: HttpRequestService) {}

  /**
   * redirectInfo
   *
   * Função que verifica se o token está valido ou não.
   *
   * @returns retorna a mensagem e o status 200(sucesso) ou 401(falha) dependendo se o token estiver válido.
   */
  @Injectable()
  async redirectRequest(): Promise<IResponseRedirect> {
    return await this.httpRedirect.sendHttpRequest(
      'http://localhost:4444/v1/check',
      'GET',
    );
  }
}
