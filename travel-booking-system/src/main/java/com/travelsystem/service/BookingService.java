package com.travelsystem.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelsystem.model.Booking;
import com.travelsystem.model.TravelPackage;
import com.travelsystem.model.User;
import com.travelsystem.repository.BookingRepository;
import com.travelsystem.repository.TravelPackageRepository;
import com.travelsystem.repository.UserRepository;
import com.travelsystem.ro.BookingRO;

@Service
public class BookingService {
	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TravelPackageRepository travelPackageRepository;

	public Booking createBooking(BookingRO booking) {
		Optional<User> findById = userRepository.findById(booking.getUserId());
		Booking book = new Booking();
		book.setCustomer(findById.get());

		Optional<TravelPackage> findById2 = travelPackageRepository.findById(booking.getPackageId());
		book.setTravelPackage(findById2.get());
		book.setDepartureDate(booking.getDepartureDate());
		return bookingRepository.save(book);
	}

	public void cancelBooking(Long bookingId) {
		bookingRepository.deleteById(bookingId);
	}

	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	public boolean deletePackage(BookingRO booking) {
		try {

			List<Booking> findAll = bookingRepository.findAll();
			if (findAll != null && findAll.size() > 0) {
				Booking booking2 = findAll.stream().filter(book -> book.getCustomer().getId() == booking.getUserId()
						&& book.getTravelPackage().getId() == booking.getPackageId()).findFirst().get();
				if (booking2 != null) {
					bookingRepository.delete(booking2);
				}
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public List<Booking> getBookingByUser(Long userId) {
		List<Booking> findAll = bookingRepository.findAll();
		if (findAll != null && findAll.size() > 0) {
			return findAll.stream().filter(book -> book.getCustomer().getId() == userId).collect(Collectors.toList());
		}
		return Arrays.asList();
	}

	public Booking getBookingById(Long bookingId) {
		return bookingRepository.findById(bookingId).get();
	}

	public Booking updateBookingById(BookingRO booking) {
		Optional<User> findById = userRepository.findById(booking.getUserId());
		Booking book = bookingRepository.findById(booking.getId()).get();
		book.setCustomer(findById.get());

		Optional<TravelPackage> findById2 = travelPackageRepository.findById(booking.getPackageId());
		book.setTravelPackage(findById2.get());
		book.setDepartureDate(booking.getDepartureDate());
		return bookingRepository.save(book);
	}

}
