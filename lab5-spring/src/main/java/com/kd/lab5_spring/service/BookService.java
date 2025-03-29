package com.kd.lab5_spring.service;

import pl.edu.pwr.ztw.books.entity.Book;
import pl.edu.pwr.ztw.books.exceptions.InvalidObjectException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;


import java.util.Collection;

public interface BookService {
    Collection<Book> getAllBooks();

    Book getBook(int id) throws ObjectNotFoundException;

    Book addBook(Book book) throws InvalidObjectException;

    Book updateBook(Book book) throws ObjectNotFoundException, InvalidObjectException;

    void deleteBook(int id) throws ObjectNotFoundException;
}
