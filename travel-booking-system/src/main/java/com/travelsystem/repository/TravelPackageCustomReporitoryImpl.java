package com.travelsystem.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.travelsystem.model.TravelPackage;

import jakarta.persistence.EntityManager;

@Repository
public class TravelPackageCustomReporitoryImpl implements TravelPackageCustomReporitory {

	@Autowired
	EntityManager em;

	@Override
	public List<TravelPackage> filterTravelPackage(String destinationCity, String destinationCountry, Long numberOfDays,
			Long numberOfNights) {
		return null;
	}

}
