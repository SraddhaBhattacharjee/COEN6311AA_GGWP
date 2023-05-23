package com.travelsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelsystem.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
