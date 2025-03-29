package com.kd.lab5_spring.exceptions;

public class BorrowedBookException extends Exception {

    public BorrowedBookException() {
        super();
    }

    public BorrowedBookException(String message) {
        super(message);
    }
}
