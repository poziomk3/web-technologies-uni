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
public class Author {
    private Long id;
    private String name;
    private LocalDate birthDate;
    private String biography;
}
