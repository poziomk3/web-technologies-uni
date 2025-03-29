package com.kd.lab5_spring.repository;

import org.springframework.stereotype.Repository;
import pl.edu.pwr.ztw.books.entity.Author;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class AuthorRepository {

    private final List<Author> authorsRepo = new ArrayList<>();

    public AuthorRepository() {
        authorsRepo.add(new Author(1, "Henryk", "Sienkiewicz"));
        authorsRepo.add(new Author(2, "Bolesław", "Prus"));
        authorsRepo.add(new Author(3, "Stanisław", "Lem"));
        authorsRepo.add(new Author(4, "Wisława", "Szymborska"));
        authorsRepo.add(new Author(5, "Czesław", "Miłosz"));
    }

    public List<Author> findAll() {
        return new ArrayList<>(authorsRepo);
    }

    public Optional<Author> findById(int id) {
        return authorsRepo.stream()
                .filter(a -> a.getId() == id)
                .findFirst();
    }

    public Author save(Author author) {
        author.setId(authorsRepo.get(authorsRepo.size() - 1).getId() + 1);
        authorsRepo.add(author);
        return author;
    }

    public void deleteById(int id) {
        authorsRepo.removeIf(a -> a.getId() == id);
    }
}
