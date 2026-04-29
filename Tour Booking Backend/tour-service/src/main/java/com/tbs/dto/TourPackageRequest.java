package com.tbs.dto;

public class TourPackageRequest {

    private String title;
    private String description;
    private Double price;
    private Integer durationDays;

    public TourPackageRequest() {
    }

    public TourPackageRequest(String title, String description, Double price, Integer durationDays) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.durationDays = durationDays;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }
}
