package com.kd.lab5_spring.exceptions;

public class ObjectNotFoundException extends Exception{

    public ObjectNotFoundException() {
        super();
    }

    public ObjectNotFoundException(String message) {
        super(message);
    }
}
