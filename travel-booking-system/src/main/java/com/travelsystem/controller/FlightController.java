package com.travelsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelsystem.model.Flight;
import com.travelsystem.service.FlightService;

@RestController
@RequestMapping("/flights")
public class FlightController {

	@Autowired
	private FlightService flightService;

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
		Flight createdFlight = flightService.createFlight(flight);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdFlight);
	}

	@CrossOrigin
	@PutMapping
	public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight) {
		Flight updatedUser = flightService.updateFlight(flight);
		return ResponseEntity.ok(updatedUser);
	}

	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<Flight>> getAllFlights() {
		List<Flight> users = flightService.getAllFlights();
		return ResponseEntity.ok(users);
	}

	@CrossOrigin
	@GetMapping("/{flightId}")
	public ResponseEntity<Flight> getFlight(@PathVariable Long flightId) {
		Flight user = flightService.getFlight(flightId);
		return ResponseEntity.ok(user);
	}
	
	@CrossOrigin
	@DeleteMapping("/{flightId}")
	public ResponseEntity<Void> deleteFlight(@PathVariable Long flightId) {
		boolean deleted = flightService.deleteFlight(flightId);
		if (deleted) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
