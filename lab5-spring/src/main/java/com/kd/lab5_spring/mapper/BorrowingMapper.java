package com.kd.lab5_spring.mapper;

import com.kd.dto.BorrowingDTO;
import com.kd.dto.BorrowingRequestDTO;
import com.kd.lab5_spring.model.Book;
import com.kd.lab5_spring.model.Borrowing;
import org.mapstruct.*;
import org.openapitools.jackson.nullable.JsonNullable;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Mapper(componentModel = "spring")
public interface BorrowingMapper {

    BorrowingDTO toDTO(Borrowing borrowing);

    @Mapping(target = "id", ignore = true)
    Borrowing toModel(BorrowingRequestDTO dto);

    @Mapping(target = "id", source = "id")
    Borrowing fromRequestDTO(Long id, BorrowingRequestDTO dto);

}