package com.kd.lab5_spring.repository;

import com.kd.lab5_spring.config.Seeding;
import com.kd.lab5_spring.model.Author;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class AuthorRepository {

    private final Map<Long, Author> authors = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    @PostConstruct
    public void init() {
        Seeding.seedAuthors(this);
    }

    public List<Author> findAll(int page, int pageSize) {
        return authors.values().stream()
                .skip((long) (page - 1) * pageSize)
                .limit(pageSize)
                .collect(Collectors.toList());
    }

    public int count() {
        return authors.size();
    }

    public Optional<Author> findById(Long id) {
        return Optional.ofNullable(authors.get(id));
    }

    public Author save(Author author) {
        Long id = idCounter.getAndIncrement();
        author.setId(id);
        authors.put(id, author);
        return author;
    }

    public Author update(Long id, Author author) {
        author.setId(id);
        authors.put(id, author);
        return author;
    }

    public boolean delete(Long id) {
        return authors.remove(id) != null;
    }
}
