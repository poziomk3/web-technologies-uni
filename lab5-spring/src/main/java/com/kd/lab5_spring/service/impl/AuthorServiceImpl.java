package com.kd.lab5_spring.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.ztw.books.entity.Author;
import pl.edu.pwr.ztw.books.exceptions.InvalidObjectException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;
import pl.edu.pwr.ztw.books.repository.AuthorRepository;
import pl.edu.pwr.ztw.books.service.AuthorService;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    public boolean isValidAuthor(Author author) {
        return author.getName() != null && author.getSurname() != null && !author.getName().isEmpty()
                && !author.getSurname().isEmpty();
    }

    @Override
    public Collection<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author getAuthor(int id) throws ObjectNotFoundException {
        return authorRepository.findById(id)
                .orElseThrow(ObjectNotFoundException::new);
    }

    @Override
    public Author addAuthor(Author author) throws InvalidObjectException {
        if (isValidAuthor(author)) {
            return authorRepository.save(author);
        }
        throw new InvalidObjectException();
    }

    @Override
    public Author updateAuthor(Author author) throws ObjectNotFoundException, InvalidObjectException {
        Author authorToUpdate = authorRepository.findById(author.getId())
                .orElseThrow(ObjectNotFoundException::new);

        if (isValidAuthor(author)) {
            authorToUpdate.setName(author.getName());
            authorToUpdate.setSurname(author.getSurname());
            return authorRepository.save(authorToUpdate);
        }
        throw new InvalidObjectException();
    }

    @Override
    public void deleteAuthor(int id) throws ObjectNotFoundException {
        Author author = authorRepository.findById(id)
                .orElseThrow(ObjectNotFoundException::new);

        authorRepository.deleteById(author.getId());
    }
}
