//Adicionar endpoints de autenticação
import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IRequestlogin, IResponseLogin } from '../interfaces/ILogin';
import { IResponseRedirect } from '../interfaces/IRedirect';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthApi {
  private apiUrl = environment.API_BASE_URL;

  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * authenticateUser

     POST que será usada no componente login.

   * @param login dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status e a data e horário de retorno da resposta.
   */
  async authenticateUser(login: IRequestlogin): Promise<IResponseLogin> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/login`,
      'POST',
      login,
    );
    localStorage.setItem('@authToken', response.data);
    return response;
  }

  /**
   * checkValidToken
   *
   * Função que verifica se o token está valido ou não.
   *
   * @returns retorna a mensagem e o status 200(sucesso) ou 401(falha) dependendo se o token estiver válido.
   */
  async checkValidToken(): Promise<IResponseRedirect> {
    return await this.httpRequestService.sendHttpRequest(
      `${this.apiUrl}/check`,
      'GET',
    );
  }
  /**
   * sendPasswordResetEmail
   * @param emailValue Email cadastrado que será enviado na solicitação http
   * @returns Retorna o resultado da verificação da existência do email do BD.
   */
  async sendPasswordResetEmail(emailValue: string | any): Promise<string> {
    const response = await this.httpRequestService.sendHttpRequest(
      '/v1/a_ser_definido',
      'POST',
      emailValue,
    );
    return response;
  }
}
