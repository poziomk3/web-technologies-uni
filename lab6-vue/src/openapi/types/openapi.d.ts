/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/books": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get paginated list of books */
        get: {
            parameters: {
                query: {
                    page: number;
                    pageSize: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of books */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PaginatedBooksDTO"];
                    };
                };
            };
        };
        put?: never;
        /** Create a new book */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["BookRequestDTO"];
                };
            };
            responses: {
                /** @description Book created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BookDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/books/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a book by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Book found */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BookDTO"];
                    };
                };
            };
        };
        /** Update a book */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["BookRequestDTO"];
                };
            };
            responses: {
                /** @description Book updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BookDTO"];
                    };
                };
            };
        };
        post?: never;
        /** Delete a book */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Book deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/authors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get paginated list of authors */
        get: {
            parameters: {
                query: {
                    page: number;
                    pageSize: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of authors */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PaginatedAuthorsDTO"];
                    };
                };
            };
        };
        put?: never;
        /** Create a new author */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["AuthorRequestDTO"];
                };
            };
            responses: {
                /** @description Author created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AuthorDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/authors/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get an author by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Author found */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AuthorDTO"];
                    };
                };
            };
        };
        /** Update an author */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["AuthorRequestDTO"];
                };
            };
            responses: {
                /** @description Author updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AuthorDTO"];
                    };
                };
            };
        };
        post?: never;
        /** Delete an author */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Author deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/borrowings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get list of all borrowings */
        get: {
            parameters: {
                query: {
                    page: number;
                    pageSize: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of borrowings */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PaginatedBorrowingsDTO"];
                    };
                };
            };
        };
        put?: never;
        /** Borrow a book */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["BorrowingRequestDTO"];
                };
            };
            responses: {
                /** @description Book borrowed */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BorrowingDTO"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/borrowings/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get borrowing status by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Borrowing status */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BorrowingDTO"];
                    };
                };
            };
        };
        /** Update borrowing status (e.g., return a book) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Borrowing status updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BorrowingDTO"];
                    };
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        BookDTO: {
            id: number;
            title: string;
            authorId: string;
            /** Format: date */
            publicationDate: string;
            genre?: string;
            description?: string;
            coverImage?: string;
            /** Format: float */
            rating?: number;
        };
        BookRequestDTO: {
            title: string;
            authorId: string;
            /** Format: date */
            publicationDate: string;
            genre?: string;
            description?: string;
            coverImage?: string;
            /** Format: float */
            rating?: number;
        };
        PaginatedBooksDTO: {
            items: components["schemas"]["BookDTO"][];
            total: number;
        };
        AuthorDTO: {
            id: number;
            name: string;
            /** Format: date */
            birthDate?: string;
            biography?: string;
        };
        AuthorRequestDTO: {
            name: string;
            /** Format: date */
            birthDate?: string;
            biography?: string;
        };
        PaginatedAuthorsDTO: {
            items: components["schemas"]["AuthorDTO"][];
            total: number;
        };
        BorrowingDTO: {
            id: number;
            id_book: number;
            /** Format: date */
            borrow_date?: string;
            /** Format: date */
            return_date?: string;
            /** @enum {string} */
            status?: "borrowed" | "returned";
        };
        BorrowingRequestDTO: {
            id_book: number;
        };
        PaginatedBorrowingsDTO: {
            items: components["schemas"]["BorrowingDTO"][];
            total: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
