package com.kd.lab5_spring.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pwr.ztw.books.exceptions.BorrowedBookException;
import pl.edu.pwr.ztw.books.exceptions.ObjectNotFoundException;
import pl.edu.pwr.ztw.books.exceptions.ReturnedBookException;
import pl.edu.pwr.ztw.books.service.BorrowingService;

@RestController
@RequiredArgsConstructor
public class BorrowingController {

    private final BorrowingService borrowingService;

    @RequestMapping(value = "/get/borrowings", method = RequestMethod.GET)
    public ResponseEntity<Object> getBorrowings() {
        return new ResponseEntity<>(borrowingService.getAllBorrowings(), HttpStatus.OK);
    }

    @RequestMapping(value = "/borrow/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> borrowBook(@PathVariable int id) {
        try {
            return new ResponseEntity<>(borrowingService.borrowBook(id), HttpStatus.OK);
        } catch (BorrowedBookException | ObjectNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/return/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> returnBook(@PathVariable int id) {
        try {
            return new ResponseEntity<>(borrowingService.returnBook(id), HttpStatus.OK);
        } catch (ReturnedBookException | ObjectNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
