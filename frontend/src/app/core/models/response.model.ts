export interface OkResponse {
    success: string;
}

export interface ErrorResponse {
    errors: {[key: string]: string}[]
}