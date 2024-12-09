
export enum ErrorMessage {
    INVALID_ACCESS_TOKEN = 'Invalid access token',
    INVALID_REFRESH_TOKEN = 'Invalid refresh token',
    INVALID_EMAIL = 'Invalid email',
    INVALID_PASSWORD = 'Invalid password',
    INCORRECT_EMAIL = 'Incorrect email',
    INCORRECT_PASSWORD = 'Incorrect password',
    EMAIL_NOT_AVAILABLE = 'Try another email',
    UNKNOWN_ERROR_TRY_AGAIN = 'Unknown error occured. Please try again.',
    EXISTED_POSTFIX = `is existed`
}

export const enum HttpErrorMessage {
    CREATE = 'Create fail.',
    NOT_FOUND = 'NOT_FOUND',
    UPDATE = 'Update fail.',
    DELETE = 'Delete fail.',
    UNAUTHORIZED = 'UNAUTHORIZED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

