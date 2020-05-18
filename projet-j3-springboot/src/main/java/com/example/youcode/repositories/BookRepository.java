package com.example.youcode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.youcode.entity.Book;



public interface BookRepository extends JpaRepository<Book, Long> {

}
