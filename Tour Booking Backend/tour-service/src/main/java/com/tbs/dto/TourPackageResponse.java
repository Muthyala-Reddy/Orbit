package com.tbs.dto;

public class TourPackageResponse {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer durationDays;

    public TourPackageResponse() {
    }

    public TourPackageResponse(Long id, String title, String description, Double price, Integer durationDays) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.durationDays = durationDays;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getDurationDays() {
        return durationDays;
    }
}