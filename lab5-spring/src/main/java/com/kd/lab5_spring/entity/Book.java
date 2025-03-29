package com.kd.lab5_spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Book {
    private int id;
    private Author author;
    private String title;
    private int pages;
    private boolean isBorrowed;
}
