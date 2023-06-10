package com.travelsystem.ro;

public class TravelPackageReport {
	private Long travelPackageId;
	private String destinationCity;
	private String destinationCountry;
	private int numBookings;
	private double totalRevenue;
	private String name;

	public TravelPackageReport(Long travelPackageId, String destinationCity, String destinationCountry, int numBookings,
			double totalRevenue, String name) {
		super();
		this.travelPackageId = travelPackageId;
		this.destinationCity = destinationCity;
		this.destinationCountry = destinationCountry;
		this.numBookings = numBookings;
		this.totalRevenue = totalRevenue;
		this.name = name;
	}

	public Long getTravelPackageId() {
		return travelPackageId;
	}

	public void setTravelPackageId(Long travelPackageId) {
		this.travelPackageId = travelPackageId;
	}

	public String getDestinationCity() {
		return destinationCity;
	}

	public void setDestinationCity(String destinationCity) {
		this.destinationCity = destinationCity;
	}

	public String getDestinationCountry() {
		return destinationCountry;
	}

	public void setDestinationCountry(String destinationCountry) {
		this.destinationCountry = destinationCountry;
	}

	public int getNumBookings() {
		return numBookings;
	}

	public void setNumBookings(int numBookings) {
		this.numBookings = numBookings;
	}

	public double getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
