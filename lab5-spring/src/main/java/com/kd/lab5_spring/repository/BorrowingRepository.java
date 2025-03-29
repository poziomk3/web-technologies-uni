package com.kd.lab5_spring.repository;

import org.springframework.stereotype.Repository;
import pl.edu.pwr.ztw.books.entity.Borrowing;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class BorrowingRepository {

    private final List<Borrowing> borrowingRepo = new ArrayList<>();

    public List<Borrowing> findAll() {
        return new ArrayList<>(borrowingRepo);
    }

    public Optional<Borrowing> findByBookId(int bookId) {
        return borrowingRepo.stream()
                .filter(b -> b.getBook().getId() == bookId && b.getActualReturnDate() == null)
                .findFirst();
    }

    public Borrowing save(Borrowing borrowing) {
        int borrowingId = borrowingRepo.isEmpty() ? 1 : borrowingRepo.get(borrowingRepo.size() - 1).getId() + 1;
        borrowing.setId(borrowingId);
        borrowingRepo.add(borrowing);
        return borrowing;
    }
}
