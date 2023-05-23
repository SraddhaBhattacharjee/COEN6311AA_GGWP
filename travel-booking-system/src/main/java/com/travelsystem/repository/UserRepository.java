package com.travelsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelsystem.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
