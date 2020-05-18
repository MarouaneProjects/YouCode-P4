package com.example.youcode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.youcode.entity.User;





public  interface UserRepository extends JpaRepository<User, Long> {

}
