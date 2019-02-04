export class Utils {
      
  /**
   * This method receives a response from HTTP request and translates to our error structure.
   * The error strucuture has the properties 'field' and 'message'.
   * @param response The response from an HTTP request.
   */
  static getErrors(response: any): any[] {
    
    switch(response.status) {
      case 401: return [{ message: "Usuário não autenticado"}];
      case 403: return [{ message: "Solicitação não autorizada"}];
      case 404: return [{ message: "Recurso não encontrado"}];
      
      case 400:
      case 409:
      case 422: return response['error'].errors;

      default: {
        console.error(response);
        return [{ message: "Ocorreu um erro inesperado"}];
      }
    }
  }

  /**
   * Makes empty string into null and removes leading and trailing spaces when it has any content.
   * @param input Any text
   */
  static sanitizeText(input: string): string {
    return input = (input) ? input.trim() : null;
  }

}