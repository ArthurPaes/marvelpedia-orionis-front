//Adicionar endpoints de autenticação
import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request.service';
import { IRequestlogin, IResponseLogin } from '../interfaces/ILogin';

@Injectable()
export class authApi {
  constructor(private httpService: HttpRequestService) {}

  /**
   * authenticateUser

     POST que será usada no componente login.

   * @param login dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status e a data e horário de retorno da resposta.
   */
  async authenticateUser(login: IRequestlogin): Promise<IResponseLogin> {
    const response = await this.httpService.sendHttpRequest(
      'http://localhost:4444/v1/login',
      'POST',
      login,
    );
    localStorage.setItem('@authToken', response.data);
    return response;
  }
}
