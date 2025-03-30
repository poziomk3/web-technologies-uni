package com.kd.lab5_spring.controller;

import com.kd.api.AuthorApi;
import com.kd.dto.AuthorDTO;
import com.kd.dto.AuthorRequestDTO;
import com.kd.dto.PaginatedAuthorsDTO;
import com.kd.lab5_spring.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthorController implements AuthorApi {

    private final AuthorService authorService;

    @Override
    public ResponseEntity<PaginatedAuthorsDTO> authorsGet(Integer page, Integer pageSize) {
        return ResponseEntity.ok(authorService.getAllAuthors(page, pageSize));
    }

    @Override
    public ResponseEntity<AuthorDTO> authorsIdGet(Integer id) {
        try {
            return ResponseEntity.ok(authorService.getAuthor(Long.valueOf(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<AuthorDTO> authorsPost(AuthorRequestDTO authorRequestDTO) {
        var created = authorService.createAuthor(authorRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Override
    public ResponseEntity<AuthorDTO> authorsIdPut(Integer id, AuthorRequestDTO authorRequestDTO) {
        try {
            var updated = authorService.updateAuthor(Long.valueOf(id), authorRequestDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Override
    public ResponseEntity<Void> authorsIdDelete(Integer id) {
        boolean deleted = authorService.deleteAuthor(Long.valueOf(id));
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
