package com.travelsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.travelsystem.model.TravelPackage;

@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long>, TravelPackageCustomReporitory {

	@Query("SELECT t FROM TravelPackage t where t.destinationCity LIKE ?1")
	List<TravelPackage> getTravelPackageByCity(String city);
	
	@Query("SELECT t FROM TravelPackage t where t.destinationCountry LIKE ?1")
	List<TravelPackage> getTravelPackageByCountry(String country);
	
	@Query("SELECT t FROM TravelPackage t where t.numberOfDays >= ?1")
	List<TravelPackage> getTravelPackageByDays(Long days);
	
	@Query("SELECT t FROM TravelPackage t where t.numberOfNights >= ?1")
	List<TravelPackage> getTravelPackageByNights(Long nights);
	
	@Query("SELECT t FROM TravelPackage t where t.price >= ?1")
	List<TravelPackage> getTravelPackageByPrice(Double price);
	
	@Query("SELECT t FROM TravelPackage t where t.destinationCity LIKE ?1 AND t.destinationCountry LIKE ?2 AND t.numberOfDays >= ?3 AND t.numberOfNights >= ?4 AND t.price >= ?5")
	List<TravelPackage> getTravelPackageByAll(String city, String country, Long days, Long nights, Double price);
	
}
