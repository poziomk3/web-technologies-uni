package com.kd.lab5_spring.repository;

import com.kd.lab5_spring.config.Seeding;
import com.kd.lab5_spring.model.Book;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class BookRepository {

    private final Map<Long, Book> books = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);


    @PostConstruct
    public void init() {
        Seeding.seedBooks(this);
    }

    public List<Book> findAll(int page, int pageSize) {
        return books.values().stream()
                .skip((long) (page - 1) * pageSize)
                .limit(pageSize)
                .collect(Collectors.toList());
    }

    public int count() {
        return books.size();
    }

    public Optional<Book> findById(Long id) {
        return Optional.ofNullable(books.get(id));
    }

    public Book save(Book book) {
        long id = idCounter.getAndIncrement();
        book.setId(id);
        books.put(id, book);
        return book;
    }

    public Book update(Long id, Book book) {
        book.setId(id);
        books.put(id, book);
        return book;
    }

    public boolean delete(Long id) {
        return books.remove(id) != null;
    }

    public boolean existsById(Long id) {
        return books.containsKey(id);
    }
}
