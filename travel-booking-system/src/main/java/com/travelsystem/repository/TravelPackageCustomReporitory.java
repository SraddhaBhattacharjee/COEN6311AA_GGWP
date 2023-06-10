package com.travelsystem.repository;

import java.util.List;

import com.travelsystem.model.TravelPackage;

public interface TravelPackageCustomReporitory {

	List<TravelPackage> filterTravelPackage(String destinationCity, String destinationCountry, Long numberOfDays,
			Long numberOfNights, Double price);

}
