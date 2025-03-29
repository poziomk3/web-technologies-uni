package com.kd.lab5_spring.exceptions;

public class ReturnedBookException extends Exception {

    public ReturnedBookException() {
        super();
    }

    public ReturnedBookException(String message) {
        super(message);
    }
}
