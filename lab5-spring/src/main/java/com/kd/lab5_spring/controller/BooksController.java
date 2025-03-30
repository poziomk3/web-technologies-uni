package com.kd.lab5_spring.controller;

import com.kd.api.BookApi;
import com.kd.dto.BookDTO;
import com.kd.dto.BookRequestDTO;
import com.kd.dto.PaginatedBooksDTO;
import com.kd.lab5_spring.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BooksController implements BookApi {

    private final BookService bookService;

    @Override
    public ResponseEntity<PaginatedBooksDTO> booksGet(Integer page, Integer pageSize) {
        PaginatedBooksDTO result = bookService.getAllBooks(page, pageSize);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<BookDTO> booksIdGet(Integer id) {
        return bookService.getBook(Long.valueOf(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<BookDTO> booksPost(BookRequestDTO bookRequestDTO) {
        BookDTO created = bookService.createBook(bookRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Override
    public ResponseEntity<BookDTO> booksIdPut(Integer id, BookRequestDTO bookRequestDTO) {
        return bookService.updateBook(Long.valueOf(id), bookRequestDTO)
                .map(updated -> ResponseEntity.ok().body(updated))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<Void> booksIdDelete(Integer id) {
        boolean deleted = bookService.deleteBook(Long.valueOf(id));
        return deleted
                ? ResponseEntity.noContent().build()
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

