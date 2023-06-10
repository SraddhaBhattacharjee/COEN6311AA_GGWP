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

import com.travelsystem.model.TravelPackage;
import com.travelsystem.ro.TravelPackageRO;
import com.travelsystem.ro.TravelPackageReport;
import com.travelsystem.service.TravelPackageService;

@RestController
@RequestMapping("/packages")
public class TravelPackageController {

	@Autowired
	private TravelPackageService travelPackageService;

	@CrossOrigin
	@PostMapping
	public ResponseEntity<TravelPackage> createTravelPackage(@RequestBody TravelPackageRO travelPackage) {
		TravelPackage createdPackage = travelPackageService.createTravelPackage(travelPackage);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPackage);
	}

	@CrossOrigin
	@PostMapping("/filter")
	public ResponseEntity<List<TravelPackage>> filterTravelPackage(@RequestBody TravelPackage travelPackage) {
		List<TravelPackage> createdPackages = travelPackageService.filterTravelPackage(travelPackage);
		return ResponseEntity.ok(createdPackages);
	}

	@CrossOrigin
	@GetMapping("/{packageId}")
	public ResponseEntity<TravelPackage> getAllTravelPackage(@PathVariable Long packageId) {
		TravelPackage travelPackage = travelPackageService.getAllTravelPackage(packageId);
		return ResponseEntity.ok(travelPackage);
	}
	

	@CrossOrigin
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<TravelPackage>> getAllTravelPackageByUSerId(@PathVariable Long userId) {
		List<TravelPackage> travelPackages = travelPackageService.getAllTravelPackageByUSerId(userId);
		return ResponseEntity.ok(travelPackages);
	}

	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<TravelPackage>> getAllTravelPackages() {
		try {
			List<TravelPackage> travelPackages = travelPackageService.getAllTravelPackages();
			return ResponseEntity.ok(travelPackages);
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	@CrossOrigin
	@PutMapping
	public ResponseEntity<TravelPackage> updateTravelPackage(@RequestBody TravelPackageRO travelPackage) {
		TravelPackage updatedPackage = travelPackageService.updateTravelPackage(travelPackage);
		return ResponseEntity.ok(updatedPackage);
	}

	@CrossOrigin
	@DeleteMapping("/{packageId}")
	public ResponseEntity<Void> deletePackage(@PathVariable Long packageId) {
		boolean deleted = travelPackageService.deletePackage(packageId);
		if (deleted) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@CrossOrigin
	@GetMapping("/reports")
	public ResponseEntity<List<TravelPackageReport>> generateTravelPackageReports() {
		List<TravelPackageReport> reports = travelPackageService.generateTravelPackageReports();
		return ResponseEntity.ok(reports);
	}
}
