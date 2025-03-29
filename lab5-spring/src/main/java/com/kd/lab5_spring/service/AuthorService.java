package com.kd.lab5_spring.service;


import pl.edu.pwr.ztw.books.entity.Author;
import pl.edu.pwr.ztw.books.exceptions.InvalidObjectException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;

import java.util.Collection;

public interface AuthorService {
    Collection<Author> getAllAuthors();

    Author getAuthor(int id) throws ObjectNotFoundException;

    Author addAuthor(Author author) throws InvalidObjectException;

    Author updateAuthor(Author author) throws ObjectNotFoundException, InvalidObjectException;

    void deleteAuthor(int id) throws ObjectNotFoundException;
}
