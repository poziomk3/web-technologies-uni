package com.kd.lab5_spring.mapper;

import com.kd.dto.AuthorDTO;
import com.kd.dto.AuthorRequestDTO;
import com.kd.lab5_spring.model.Author;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AuthorMapper {

    AuthorDTO toDTO(Author author);

    @Mapping(target = "id", ignore = true)
    Author toModel(AuthorRequestDTO dto);

    @Mapping(target = "id", source = "id")
    Author fromRequestDTO(Long id, AuthorRequestDTO dto);
}
