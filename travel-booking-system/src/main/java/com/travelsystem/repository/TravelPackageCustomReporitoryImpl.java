package com.travelsystem.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.travelsystem.model.TravelPackage;

@Repository
public class TravelPackageCustomReporitoryImpl implements TravelPackageCustomReporitory {

	@Autowired
	EntityManager em;

	@Override
	public List<TravelPackage> filterTravelPackage(String destinationCity, String destinationCountry, Long numberOfDays,
			Long numberOfNights, Double price) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<TravelPackage> criteriaQuery = criteriaBuilder.createQuery(TravelPackage.class);

		Root<TravelPackage> root = criteriaQuery.from(TravelPackage.class);

		List<Predicate> predicates = new ArrayList<>();

		if (destinationCity != null && destinationCity.length() > 0) {
			predicates.add(criteriaBuilder.equal(root.get("destinationCity"), destinationCity));
		}
		if (destinationCountry != null && destinationCountry.length() > 0) {
			predicates.add(criteriaBuilder.equal(root.get("destinationCountry"), destinationCountry));
		}
		if (price != null) {
			predicates.add(criteriaBuilder.gt(root.get("price"), price));
		}

		if (numberOfDays != null) {
			predicates.add(criteriaBuilder.gt(root.get("numberOfDays"), numberOfDays));
		}

		if (numberOfNights != null) {
			predicates.add(criteriaBuilder.gt(root.get("numberOfNights"), numberOfNights));
		}

		criteriaQuery.where(predicates.toArray(new Predicate[0]));

		return em.createQuery(criteriaQuery).getResultList();
	}

}
