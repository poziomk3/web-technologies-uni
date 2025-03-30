package com.kd.lab5_spring.config;

import com.kd.lab5_spring.model.Author;
import com.kd.lab5_spring.model.Book;
import com.kd.lab5_spring.repository.AuthorRepository;
import com.kd.lab5_spring.repository.BookRepository;

import java.time.LocalDate;

public class Seeding {

    public static void seedBooks(BookRepository bookRepository) {
        bookRepository.save(Book.builder()
                .title("Władca Pierścieni")
                .authorId("1")
                .publicationDate(LocalDate.of(1954, 7, 29))
                .genre("Fantasy")
                .description("Epicka opowieść o Śródziemiu")
                .coverImage("https://example.com/lotr.jpg")
                .rating(4.8f)
                .build());

        bookRepository.save(Book.builder()
                .title("Zbrodnia i kara")
                .authorId("2")
                .publicationDate(LocalDate.of(1866, 1, 1))
                .genre("Dramat")
                .description("Raskolnikow i jego dylemat moralny")
                .coverImage("https://example.com/zbrodnia.jpg")
                .rating(4.5f)
                .build());

        bookRepository.save(Book.builder()
                .title("Lalka")
                .authorId("3")
                .publicationDate(LocalDate.of(1890, 1, 1))
                .genre("Powieść realistyczna")
                .description("Losy Stanisława Wokulskiego")
                .coverImage("https://example.com/lalka.jpg")
                .rating(4.1f)
                .build());

        bookRepository.save(Book.builder()
                .title("Harry Potter i Kamień Filozoficzny")
                .authorId("4")
                .publicationDate(LocalDate.of(1997, 6, 26))
                .genre("Fantasy")
                .description("Pierwsza część przygód Harry'ego Pottera")
                .coverImage("https://example.com/hp1.jpg")
                .rating(4.9f)
                .build());
    }

    public static void seedAuthors(AuthorRepository authorRepository) {
        authorRepository.save(Author.builder()
                .name("J.R.R. Tolkien")
                .birthDate(LocalDate.of(1892, 1, 3))
                .biography("Autor trylogii Władca Pierścieni i Hobbita.")
                .build());

        authorRepository.save(Author.builder()
                .name("Fiodor Dostojewski")
                .birthDate(LocalDate.of(1821, 11, 11))
                .biography("Rosyjski powieściopisarz, autor 'Zbrodni i kary'.")
                .build());

        authorRepository.save(Author.builder()
                .name("Bolesław Prus")
                .birthDate(LocalDate.of(1847, 8, 20))
                .biography("Polski pisarz pozytywistyczny, autor 'Lalki'.")
                .build());

        authorRepository.save(Author.builder()
                .name("J.K. Rowling")
                .birthDate(LocalDate.of(1965, 7, 31))
                .biography("Autorka serii o Harrym Potterze.")
                .build());
    }
}
