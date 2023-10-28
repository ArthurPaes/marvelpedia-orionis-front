//Adicionar endpoints de autenticação
import { HttpRequestService } from '../http-request.service';
import { IRequestlogin, IResponseLogin } from '../interfaces/ILogin';

export class UserAuth {
  constructor(private auth: HttpRequestService) {}

  /**
   *
   * @param login dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status, token e a data e horário de retorno da resposta.
   */

  async authenticateUser(login: IRequestlogin): Promise<IResponseLogin> {
    const response = await this.auth.sendHttpRequest(
      'http://localhost:4444/login',
      'POST',
      login,
    );
    localStorage.setItem('@authToken', response.data);
    return response;
  }
}
