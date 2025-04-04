package com.kd.lab5_spring.mapper;

import com.kd.dto.BookDTO;
import com.kd.dto.BookRequestDTO;
import com.kd.lab5_spring.model.Book;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BookMapper {

    BookDTO toDTO(Book book);

    @Mapping(target = "id", ignore = true)
    Book toModel(BookRequestDTO dto);

    @Mapping(target = "id", source = "id")
    Book fromRequestDTO(Long id, BookRequestDTO dto);
}
