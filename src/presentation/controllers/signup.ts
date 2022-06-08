import { MissingParamError } from '../errors/missing-params-errors'
import { badRequest } from '../helper/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      // return {
      //   statusCode: 400,
      //   body: new MissingParamError('name')
      // }

      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      // return {
      //   statusCode: 400,
      //   body: new MissingParamError('email')
      // }
      return badRequest(new MissingParamError('email'))
    }
    return { statusCode: 200, body: {} }
  }
}
