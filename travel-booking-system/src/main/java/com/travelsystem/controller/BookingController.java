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

import com.travelsystem.model.Booking;
import com.travelsystem.ro.BookingRO;
import com.travelsystem.service.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@CrossOrigin
	@PostMapping
	public ResponseEntity<Booking> createBooking(@RequestBody BookingRO booking) {
		Booking createdBooking = bookingService.createBooking(booking);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
	}

	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<Booking>> getBookings() {
		List<Booking> travelPackages = bookingService.getAllBookings();
		return ResponseEntity.ok(travelPackages);
	}

	@CrossOrigin
	@GetMapping("/{userId}")
	public ResponseEntity<List<Booking>> getBookingByUser(@PathVariable Long userId) {
		List<Booking> travelPackages = bookingService.getBookingByUser(userId);
		return ResponseEntity.ok(travelPackages);
	}

	@CrossOrigin
	@GetMapping("/book/{bookingId}")
	public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) {
		Booking travelPackages = bookingService.getBookingById(bookingId);
		return ResponseEntity.ok(travelPackages);
	}

	@CrossOrigin
	@PutMapping
	public ResponseEntity<Booking> updateBookingById(@RequestBody BookingRO booking) {
		Booking travelPackages = bookingService.updateBookingById(booking);
		return ResponseEntity.ok(travelPackages);
	}

	@CrossOrigin
	@DeleteMapping
	public ResponseEntity<Void> deletePackage(@RequestBody BookingRO booking) {
		boolean deleted = bookingService.deletePackage(booking);
		if (deleted) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
