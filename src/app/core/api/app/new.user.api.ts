import { HttpRequestService } from '../http-request.service';
import { IRequestNewUser, IResponseNewUser } from '../interfaces/INewUser';

export class NewUserRegister {
  constructor(private newUser: HttpRequestService) {}

  /**
   *
   * @param newUserRegister dados em formato de objeto que será enviado na solicitação http
   * @returns retorna o status, token e a data e horário de retorno da resposta.
   */

  async authenticateUser(
    newUserRegister: IRequestNewUser,
  ): Promise<IResponseNewUser> {
    const response = await this.newUser.sendHttpRequest(
      'http://localhost:4444/signup',
      'POST',
      newUserRegister,
    );
    localStorage.setItem('@authToken', response.data);
    return response;
  }
}
