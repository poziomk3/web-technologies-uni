package com.kd.lab5_spring.repository;

import com.kd.lab5_spring.model.Author;
import com.kd.lab5_spring.model.Borrowing;
import com.kd.lab5_spring.model.BorrowingStatus;
import com.kd.lab5_spring.service.BorrowingService;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class BorrowingRepository {

    private final Map<Long, Borrowing> borrowings = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public List<Borrowing> findAll(int page, int pageSize) {
        return borrowings.values().stream()
                .skip((long) (page - 1) * pageSize)
                .limit(pageSize)
                .collect(Collectors.toList());
    }

    public int count() {
        return borrowings.size();
    }

    public Optional<Borrowing> findById(Long id) {
        return Optional.ofNullable(borrowings.get(id));
    }

    public Borrowing save(Borrowing borrowing) {
        boolean isAlreadyBorrowed = borrowings.values().stream()
                .anyMatch(b -> Objects.equals(b.getIdBook(), borrowing.getIdBook()) &&
                        b.getStatus() == BorrowingStatus.BORROWED);

        if (isAlreadyBorrowed) {
            throw new IllegalStateException("Book is already borrowed.");
        }

        long id = idCounter.getAndIncrement();
        borrowing.setId(id);
        borrowing.setBorrowDate(LocalDate.now()); // Ustawienie daty wypożyczenia
        borrowing.setStatus(BorrowingStatus.BORROWED); // Domyślny status
        borrowings.put(id, borrowing);
        return borrowing;
    }

    public Borrowing returnBook(Long id) {
        Borrowing borrowing = borrowings.get(id);
        if (borrowing != null) {
            borrowing.setStatus(BorrowingStatus.RETURNED);
            borrowing.setReturnDate(LocalDate.now()); // Automatycznie ustaw datę zwrotu
        }
        return borrowing;
    }

    public boolean existsById(Long id) {
        return borrowings.containsKey(id);
    }
}