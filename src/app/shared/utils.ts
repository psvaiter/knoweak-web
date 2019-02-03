export class Utils {
      
  /**
   * This method receives a response from HTTP request and translates to our error structure.
   * The error strucuture has the properties 'field' and 'message'.
   * @param response The response from an HTTP request.
   */
  static getErrors(response: any): any[] {
    
    switch(response.status) {
      case 401: return [{ message: "Acesso negado"}];
      case 403: return [{ message: "Acesso não autorizado"}];
      case 404: return [{ message: "Recurso não encontrado"}];
      
      case 400:
      case 409:
      case 422: return response['error'].errors;

      default: return [{ message: "Ocorreu um erro inesperado"}];
    }
  }

}