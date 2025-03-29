package com.kd.lab5_spring.repository;

import org.springframework.stereotype.Repository;
import pl.edu.pwr.ztw.books.entity.Book;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class BookRepository {

    private final List<Book> booksRepo = new ArrayList<>();

    public BookRepository() {
        booksRepo.add(new Book(1, new pl.edu.pwr.ztw.books.entity.Author(1, "Henryk", "Sienkiewicz"),
                "Quo Vadis", 592, false));
        booksRepo.add(new Book(2, new pl.edu.pwr.ztw.books.entity.Author(2, "Bolesław", "Prus"),
                "Lalka", 672, false));
        booksRepo.add(new Book(3, new pl.edu.pwr.ztw.books.entity.Author(3, "Stanisław", "Lem"),
                "Solaris", 320, false));
        booksRepo.add(new Book(4, new pl.edu.pwr.ztw.books.entity.Author(4, "Wisława", "Szymborska"),
                "Koniec i początek", 120, false));
        booksRepo.add(new Book(5, new pl.edu.pwr.ztw.books.entity.Author(5, "Czesław", "Miłosz"),
                "Zniewolony umysł", 270, false));
    }

    public List<Book> findAll() {
        return new ArrayList<>(booksRepo);
    }

    public Optional<Book> findById(int id) {
        return booksRepo.stream()
                .filter(b -> b.getId() == id)
                .findFirst();
    }

    public Book save(Book book) {
        book.setId(booksRepo.get(booksRepo.size() - 1).getId() + 1);
        booksRepo.add(book);
        return book;
    }

    public void deleteById(int id) {
        booksRepo.removeIf(b -> b.getId() == id);
    }
}
