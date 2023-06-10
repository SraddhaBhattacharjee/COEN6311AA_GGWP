package com.travelsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelsystem.model.Flight;
import com.travelsystem.repository.FlightRepository;

@Service
public class FlightService {

	@Autowired
	private FlightRepository flightRepository;

	public Flight createFlight(Flight flight) {
		return flightRepository.save(flight);
	}

	public Flight updateFlight(Flight flight) {
		Optional<Flight> findById = flightRepository.findById(flight.getId());
		Flight flight2 = findById.get();
		flight2.setCost(flight.getCost());
		flight2.setDestination(flight.getDestination());
		flight2.setName(flight.getName());
		flight2.setSource(flight.getSource());
		return flightRepository.save(flight2);

	}

	public List<Flight> getAllFlights() {
		return flightRepository.findAll();
	}

	public Flight getFlight(Long flightId) {
		return flightRepository.findById(flightId).get();
	}

	public boolean deleteFlight(Long flightId) {
		if (flightRepository.existsById(flightId)) {
			flightRepository.deleteById(flightId);
			return true;
		} else {
			return false;
		}
	}

}
