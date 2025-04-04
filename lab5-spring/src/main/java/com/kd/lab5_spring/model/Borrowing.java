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
public class Borrowing {
    private Long id;
    private Long idBook;
    private LocalDate borrowDate;
    private LocalDate returnDate;
    private BorrowingStatus status;
}
