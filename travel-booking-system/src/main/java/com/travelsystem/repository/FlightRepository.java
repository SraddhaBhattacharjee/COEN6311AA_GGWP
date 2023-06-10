package com.travelsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelsystem.model.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

}
