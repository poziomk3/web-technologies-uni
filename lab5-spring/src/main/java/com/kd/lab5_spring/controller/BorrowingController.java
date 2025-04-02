package com.kd.lab5_spring.controller;

import com.kd.api.BorrowingApi;
import com.kd.dto.*;
import com.kd.lab5_spring.service.BorrowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class BorrowingController implements BorrowingApi {
    private final BorrowingService borrowingService;

    @Override
    public ResponseEntity<PaginatedBorrowingsDTO> borrowingsGet(Integer page, Integer pageSize){
        PaginatedBorrowingsDTO result = borrowingService.getAllBorrowings(page, pageSize);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<BorrowingDTO> borrowingsIdGet(Integer id) {
        return borrowingService.getBorrowing(Long.valueOf(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<BorrowingDTO> borrowingsPost(BorrowingRequestDTO borrowingRequestDTO) {
        BorrowingDTO created = borrowingService.createBorrowing(borrowingRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Override
    public ResponseEntity<BorrowingDTO> borrowingsIdPut(Integer id) {
        return borrowingService.updateBook(Long.valueOf(id))
                .map(updated -> ResponseEntity.ok().body(updated))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
