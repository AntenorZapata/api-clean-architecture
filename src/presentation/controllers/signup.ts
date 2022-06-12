import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest, serverError } from '../helper/http-helper'
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller
} from '../protocols'

export class SignupController implements Controller {
  constructor(readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
      return { statusCode: 200, body: {} }
    } catch (e) {
      return serverError(new ServerError())
    }
  }
}
