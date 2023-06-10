package com.travelsystem.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelsystem.model.Booking;
import com.travelsystem.model.Flight;
import com.travelsystem.model.TravelPackage;
import com.travelsystem.model.User;
import com.travelsystem.repository.BookingRepository;
import com.travelsystem.repository.FlightRepository;
import com.travelsystem.repository.TravelPackageRepository;
import com.travelsystem.repository.UserRepository;
import com.travelsystem.ro.TravelPackageRO;
import com.travelsystem.ro.TravelPackageReport;

@Service
public class TravelPackageService {
	@Autowired
	private TravelPackageRepository travelPackageRepository;
	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserRepository userRepository;

	public TravelPackage createTravelPackage(TravelPackageRO travelPackage) {
		TravelPackage entity = new TravelPackage();
		if (travelPackage.getFlightId() != null) {
			Flight flight = flightRepository.findById(travelPackage.getFlightId()).get();
			entity.setFlight(flight);
		}

		if (travelPackage.getUserId() != null) {
			User user = userRepository.findById(travelPackage.getUserId()).get();
			entity.setUser(user);
		}
		entity.setDestinationCity(travelPackage.getDestinationCity());
		entity.setDestinationCountry(travelPackage.getDestinationCountry());
		entity.setHotelName(travelPackage.getHotelName());
		entity.setName(travelPackage.getName());
		entity.setNumberOfDays(travelPackage.getNumberOfDays());
		entity.setNumberOfNights(travelPackage.getNumberOfNights());
		entity.setPrice(travelPackage.getPrice());

		return travelPackageRepository.save(entity);
	}

	public TravelPackage updateTravelPackage(TravelPackageRO travelPackage) {
		Optional<TravelPackage> findById = travelPackageRepository.findById(travelPackage.getId());
		TravelPackage existingTravelPackage = findById.get();
		setAttribute(existingTravelPackage, travelPackage);
		return travelPackageRepository.save(existingTravelPackage);
	}

	private void setAttribute(TravelPackage existingTravelPackage, TravelPackageRO travelPackage) {
		existingTravelPackage.setDestinationCity(travelPackage.getDestinationCity());
		existingTravelPackage.setDestinationCountry(travelPackage.getDestinationCountry());
		existingTravelPackage.setHotelName(travelPackage.getHotelName());
		existingTravelPackage.setName(travelPackage.getName());
		existingTravelPackage.setNumberOfDays(travelPackage.getNumberOfDays());
		existingTravelPackage.setNumberOfNights(travelPackage.getNumberOfNights());
		existingTravelPackage.setPrice(travelPackage.getPrice());
		if (travelPackage.getFlightId() != null) {
			Flight flight = flightRepository.findById(travelPackage.getFlightId()).get();
			existingTravelPackage.setFlight(flight);
		}
		if (travelPackage.getUserId() != null) {
			User user = userRepository.findById(travelPackage.getUserId()).get();
			existingTravelPackage.setUser(user);
		}
	}

	public List<TravelPackage> getAllTravelPackages() {
		return travelPackageRepository.findAll();
	}

	public List<TravelPackageReport> generateTravelPackageReports() {
		List<TravelPackage> travelPackages = travelPackageRepository.findAll();
		List<TravelPackageReport> reports = new ArrayList<>(travelPackages.size());
		List<Booking> bookings = bookingRepository.findAll();
		if (bookings == null) {
			return Arrays.asList();
		}
		Map<Long, List<Booking>> collect = bookings.stream()
				.collect(Collectors.groupingBy(book -> book.getTravelPackage().getId()));
		for (TravelPackage travelPackage : travelPackages) {
			List<Booking> list = collect.get(travelPackage.getId());
			int numBookings = list == null ? 0 : list.size();
			double totalRevenue = travelPackage.getPrice() * numBookings;

			TravelPackageReport report = new TravelPackageReport(travelPackage.getId(),
					travelPackage.getDestinationCity(), travelPackage.getDestinationCountry(), numBookings,
					totalRevenue, travelPackage.getName());

			reports.add(report);
		}

		return reports;
	}

	public boolean deletePackage(Long packageId) {
		if (travelPackageRepository.existsById(packageId)) {
			travelPackageRepository.deleteById(packageId);
			return true;
		} else {
			return false;
		}
	}

	public TravelPackage getAllTravelPackage(Long packageId) {
		Optional<TravelPackage> findById = travelPackageRepository.findById(packageId);
		return findById.get();
	}

	public List<TravelPackage> filterTravelPackage(TravelPackage travelPackage) {
		String destinationCity = travelPackage.getDestinationCity();
		String destinationCountry = travelPackage.getDestinationCountry();
		Long numberOfDays = travelPackage.getNumberOfDays();
		Long numberOfNights = travelPackage.getNumberOfNights();
		Double price = travelPackage.getPrice();
		return travelPackageRepository.filterTravelPackage(destinationCity, destinationCountry, numberOfDays,
				numberOfNights, price);
	}

	public List<TravelPackage> getAllTravelPackageByUSerId(Long userId) {
		List<TravelPackage> findAll = travelPackageRepository.findAll();
		return findAll.stream().filter(travel -> travel.getUser() != null && travel.getUser().getId() == userId)
				.collect(Collectors.toList());
	}

}
