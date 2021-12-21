export function ApiEndpoint(params: ApiEndpointParams): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {};
}

export interface ApiEndpointParams {
  name?: string;
  method?: HttpMethod;
  url?: string;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD'
}
