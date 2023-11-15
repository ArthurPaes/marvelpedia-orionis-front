import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IRequestlogin, IResponseLogin } from '../interfaces/ILogin';
import { IResponseRedirect } from '../interfaces/IRedirect';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthApi {
  constructor(
    private httpRequestService: HttpRequestService,
    private route: ActivatedRoute,
  ) {}

  /**
   * authenticateUser

     POST que será usada no componente login.

   * @param login dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status e a data e horário de retorno da resposta.
   */
  async authenticateUser(login: IRequestlogin): Promise<IResponseLogin> {
    const response = await this.httpRequestService.sendHttpRequest(
      'http://localhost:4444/v1/login',
      'POST',
      login,
    );
    localStorage.setItem('@authToken', response.data);
    return response;
  }

  public token = '';

  /**
   * checkValidToken
   *
   * Função que verifica se o token está valido ou não.
   *
   * @returns retorna a mensagem e o status 200(sucesso) ou 401(falha) dependendo se o token estiver válido.
   */
  async checkValidToken(): Promise<IResponseRedirect> {
    this.route.queryParams.subscribe((queryParam) => {
      this.token = queryParam['token'];
      console.log(this.token);
    });
    return await this.httpRequestService.sendHttpRequest(
      `http://localhost:4444/v1/check?token=${this.token}`,
      'GET',
    );
  }
}
