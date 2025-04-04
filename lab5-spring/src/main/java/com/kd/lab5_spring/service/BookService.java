package com.kd.lab5_spring.service;

import com.kd.dto.*;
import com.kd.lab5_spring.mapper.BookMapper;
import com.kd.lab5_spring.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public PaginatedBooksDTO getAllBooks(int page, int pageSize) {
        var books = bookRepository.findAll(page, pageSize);
        var total = bookRepository.count();

        return new PaginatedBooksDTO()
                .items(books.stream().map(bookMapper::toDTO).collect(Collectors.toList()))
                .total(total);
    }

    public Optional<BookDTO> getBook(Long id) {
        return bookRepository.findById(id).map(bookMapper::toDTO);
    }

    public BookDTO createBook(BookRequestDTO request) {
        var saved = bookRepository.save(bookMapper.toModel(request));
        return bookMapper.toDTO(saved);
    }

    public Optional<BookDTO> updateBook(Long id, BookRequestDTO request) {
        if (!bookRepository.existsById(id)) {
            return Optional.empty();
        }
        var updated = bookRepository.update(id, bookMapper.fromRequestDTO(id, request));
        return Optional.of(bookMapper.toDTO(updated));
    }


    public boolean deleteBook(Long id) {
        return bookRepository.delete(id);
    }
}
