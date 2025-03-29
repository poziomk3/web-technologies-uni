package com.kd.lab5_spring.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pwr.ztw.books.entity.Book;
import pl.edu.pwr.ztw.books.entity.Borrowing;
import pl.edu.pwr.ztw.books.entity.BorrowingStatus;
import pl.edu.pwr.ztw.books.exceptions.BorrowedBookException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;
import pl.edu.pwr.ztw.books.exceptions.ReturnedBookException;
import pl.edu.pwr.ztw.books.repository.BorrowingRepository;
import pl.edu.pwr.ztw.books.service.BorrowingService;
import pl.edu.pwr.ztw.books.service.BookService;

import java.time.LocalDateTime;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class BorrowingServiceImpl implements BorrowingService {

    private final BookService bookService;
    private final BorrowingRepository borrowingRepository;

    @Override
    public Collection<Borrowing> getAllBorrowings() {
        return borrowingRepository.findAll();
    }

    @Override
    public Borrowing borrowBook(int id) throws ObjectNotFoundException, BorrowedBookException {
        Book bookToBorrow = bookService.getBook(id);

        if (bookToBorrow.isBorrowed()) {
            throw new BorrowedBookException("This book is already borrowed!");
        }

        bookToBorrow.setBorrowed(true);
        Borrowing newBorrowing = new Borrowing(0, bookToBorrow, LocalDateTime.now(), LocalDateTime.now().plusWeeks(2), null, BorrowingStatus.BORROWED);
        return borrowingRepository.save(newBorrowing);
    }

    @Override
    public Borrowing returnBook(int id) throws ObjectNotFoundException, ReturnedBookException {
        Book bookToReturn = bookService.getBook(id);

        if (!bookToReturn.isBorrowed()) {
            throw new ReturnedBookException("This book is not borrowed yet!");
        }

        Borrowing returnedBorrowing = borrowingRepository.findByBookId(id)
                .orElseThrow(() -> new ObjectNotFoundException("No active borrowing found for this book"));

        returnedBorrowing.setActualReturnDate(LocalDateTime.now());
        returnedBorrowing.setStatus(BorrowingStatus.RETURNED);
        bookToReturn.setBorrowed(false);
        return returnedBorrowing;
    }
}
