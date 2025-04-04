package com.kd.lab5_spring.service;

import com.kd.dto.*;
import com.kd.lab5_spring.mapper.AuthorMapper;
import com.kd.lab5_spring.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorService {

    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    public PaginatedAuthorsDTO getAllAuthors(int page, int pageSize) {
        var authors = authorRepository.findAll(page, pageSize);
        var total = authorRepository.count();

        return new PaginatedAuthorsDTO()
                .items(authors.stream().map(authorMapper::toDTO).collect(Collectors.toList()))
                .total(total);
    }

    public AuthorDTO getAuthor(Long id) {
        return authorRepository.findById(id)
                .map(authorMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Author not found"));
    }

    public AuthorDTO createAuthor(AuthorRequestDTO request) {
        var saved = authorRepository.save(authorMapper.toModel(request));
        return authorMapper.toDTO(saved);
    }

    public AuthorDTO updateAuthor(Long id, AuthorRequestDTO request) {
        var updated = authorRepository.update(id, authorMapper.fromRequestDTO(id, request));
        return authorMapper.toDTO(updated);
    }

    public boolean deleteAuthor(Long id) {
        return authorRepository.delete(id);
    }
}
