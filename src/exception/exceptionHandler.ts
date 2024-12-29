
import { HttpStatusCode } from "../constants/http";

class GlobalExceptionHandler extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: any
    ) {
        super(message);
    }
}

export default GlobalExceptionHandler;