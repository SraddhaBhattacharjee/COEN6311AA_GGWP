package com.travelsystem.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelsystem.model.Booking;
import com.travelsystem.model.TravelPackage;
import com.travelsystem.repository.BookingRepository;
import com.travelsystem.repository.TravelPackageRepository;
import com.travelsystem.ro.TravelPackageReport;

@Service
public class TravelPackageService {
	@Autowired
	private TravelPackageRepository travelPackageRepository;

	@Autowired
	private BookingRepository bookingRepository;

	public TravelPackage createTravelPackage(TravelPackage travelPackage) {
		return travelPackageRepository.save(travelPackage);
	}

	public TravelPackage updateTravelPackage(TravelPackage travelPackage) {
		Optional<TravelPackage> findById = travelPackageRepository.findById(travelPackage.getId());
		if (findById.isEmpty()) {
			return null;
		}
		TravelPackage existingTravelPackage = findById.get();
		setAttribute(existingTravelPackage, travelPackage);
		return travelPackageRepository.save(existingTravelPackage);
	}

	private void setAttribute(TravelPackage existingTravelPackage, TravelPackage travelPackage) {
		existingTravelPackage.setDestinationCity(travelPackage.getDestinationCity());
		existingTravelPackage.setDestinationCountry(travelPackage.getDestinationCountry());
		existingTravelPackage.setHotelName(travelPackage.getHotelName());
		existingTravelPackage.setName(travelPackage.getName());
		existingTravelPackage.setNumberOfDays(travelPackage.getNumberOfDays());
		existingTravelPackage.setNumberOfNights(travelPackage.getNumberOfNights());
		existingTravelPackage.setPrice(travelPackage.getPrice());
	}

	public List<TravelPackage> getAllTravelPackages() {
		return travelPackageRepository.findAll();
	}

	public List<TravelPackageReport> generateTravelPackageReports() {
		List<TravelPackage> travelPackages = travelPackageRepository.findAll();
		List<TravelPackageReport> reports = new ArrayList<>(travelPackages.size());
		List<Booking> bookings = bookingRepository.findAll();
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

}
