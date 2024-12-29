import assert from 'node:assert'
import GlobalExceptionHandler from '../exception/exceptionHandler'
import { HttpStatusCode } from './../constants/http';

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
) => asserts condition

const appAssert: AppAssert = (condition, httpStatusCode, message) => {
    assert(condition, new GlobalExceptionHandler(httpStatusCode, message))
}

export default appAssert;