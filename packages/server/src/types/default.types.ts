export type GenericResponse<T> = {
    success: boolean;
    message: string;
    data?: T | null;
};

export type PaginationQuery = {
    page?: number;
    limit?: number;
};

export type PaginationResponse<T> = {
    success: boolean;
    message: string;
    data: T[];
};
