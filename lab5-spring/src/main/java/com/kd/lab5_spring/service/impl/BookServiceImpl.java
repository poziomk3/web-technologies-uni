package com.kd.lab5_spring.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.ztw.books.entity.Book;
import pl.edu.pwr.ztw.books.exceptions.InvalidObjectException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;
import pl.edu.pwr.ztw.books.repository.BookRepository;
import pl.edu.pwr.ztw.books.service.BookService;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final AuthorServiceImpl authorService;
    private final BookRepository bookRepository;

    private boolean isValidBook(Book book) {
        return book.getAuthor() != null
                && !book.getTitle().isEmpty()
                && book.getPages() > 0
                && authorService.getAllAuthors().contains(book.getAuthor());
    }

    @Override
    public Collection<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBook(int id) throws ObjectNotFoundException {
        return bookRepository.findById(id)
                .orElseThrow(ObjectNotFoundException::new);
    }

    @Override
    public Book addBook(Book book) throws InvalidObjectException {
        if (isValidBook(book) && authorService.isValidAuthor(book.getAuthor())) {
            return bookRepository.save(book);
        }
        throw new InvalidObjectException();
    }

    @Override
    public Book updateBook(Book book) throws ObjectNotFoundException, InvalidObjectException {
        Book bookToUpdate = bookRepository.findById(book.getId())
                .orElseThrow(ObjectNotFoundException::new);

        if (isValidBook(book) && authorService.isValidAuthor(book.getAuthor())) {
            bookToUpdate.setAuthor(book.getAuthor());
            bookToUpdate.setTitle(book.getTitle());
            bookToUpdate.setPages(book.getPages());
            return bookRepository.save(bookToUpdate);
        }
        throw new InvalidObjectException();
    }

    @Override
    public void deleteBook(int id) throws ObjectNotFoundException {
        Book book = bookRepository.findById(id)
                .orElseThrow(ObjectNotFoundException::new);

        bookRepository.deleteById(book.getId());
    }
}
