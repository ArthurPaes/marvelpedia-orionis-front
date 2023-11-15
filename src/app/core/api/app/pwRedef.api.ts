import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';

@Injectable()
export class PasswordRedefApi {
  constructor(private httpService: HttpRequestService) {}
  /**
   * pwRedefSendEmail
   * @param emailValue Email cadastrado que será enviado na solicitação http
   * @returns Retorna o resultado da verificação da existência do email do BD.
   */
  async pwRedefSendEmail(emailValue: string | any): Promise<string> {
    const response = await this.httpService.sendHttpRequest(
      '/v1/a_ser_definido',
      'POST',
      emailValue,
    );
    return response;
  }
}
