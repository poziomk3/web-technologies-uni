package com.kd.lab5_spring.service;


import pl.edu.pwr.ztw.books.entity.Borrowing;
import pl.edu.pwr.ztw.books.exceptions.BorrowedBookException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;
import pl.edu.pwr.ztw.books.exceptions.ReturnedBookException;

import java.util.Collection;

public interface BorrowingService {

    Collection<Borrowing> getAllBorrowings();

    Borrowing borrowBook(int id) throws ObjectNotFoundException, BorrowedBookException;

    Borrowing returnBook(int id) throws ObjectNotFoundException, ReturnedBookException;
}
