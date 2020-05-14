export interface RestErrorResponse {
    content?: {
        message?: string
    } | string,
    message?: string
}