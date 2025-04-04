package com.kd.lab5_spring.service;


import com.kd.dto.*;
import com.kd.lab5_spring.mapper.BookMapper;
import com.kd.lab5_spring.mapper.BorrowingMapper;
import com.kd.lab5_spring.repository.BookRepository;
import com.kd.lab5_spring.repository.BorrowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BorrowingService {
    private final BorrowingRepository borrowingRepository;
    private final BorrowingMapper borrowingMapper;

    public PaginatedBorrowingsDTO getAllBorrowings(int page, int pageSize) {
        var borrowings = borrowingRepository.findAll(page, pageSize);
        var total = borrowingRepository.count();

        return new PaginatedBorrowingsDTO()
                .items(borrowings.stream().map(borrowingMapper::toDTO).collect(Collectors.toList()))
                .total(total);
    }

    public Optional<BorrowingDTO> getBorrowing(Long id) {
        return borrowingRepository.findById(id).map(borrowingMapper::toDTO);
    }

    public BorrowingDTO createBorrowing(BorrowingRequestDTO request) {

        var saved = borrowingRepository.save(borrowingMapper.toModel(request));
        return borrowingMapper.toDTO(saved);
    }

    public Optional<BorrowingDTO> updateBook(Long id) {
        if (!borrowingRepository.existsById(id)) {
            return Optional.empty();
        }
        var updated = borrowingRepository.returnBook(id);
        return Optional.of(borrowingMapper.toDTO(updated));
    }

}
