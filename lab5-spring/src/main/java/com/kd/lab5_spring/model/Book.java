package com.kd.lab5_spring.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    private Long id;
    private String title;
    private String authorId; // or Long if author IDs are Long
    private LocalDate publicationDate;
    private String genre;
    private String description;
    private String coverImage;
    private Float rating;
}
