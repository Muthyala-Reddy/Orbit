package com.tbs.controller;

import com.tbs.dto.TourPackageRequest;
import com.tbs.dto.TourPackageResponse;
import com.tbs.service.TourPackageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")

public class TourPackageController {

    private final TourPackageService tourPackageService;

    public TourPackageController(TourPackageService tourPackageService) {
        this.tourPackageService = tourPackageService;
    }

    @PostMapping
    public TourPackageResponse create(@RequestBody TourPackageRequest request) {
        return tourPackageService.create(request);
    }

    @GetMapping
    public List<TourPackageResponse> getAll() {
        return tourPackageService.getAll();
    }

    @GetMapping("/{id}")
    public TourPackageResponse getById(@PathVariable Long id) {
        return tourPackageService.getById(id);
    }

    @PutMapping("/{id}")
    public TourPackageResponse update(@PathVariable Long id, @RequestBody TourPackageRequest request) {
        return tourPackageService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        tourPackageService.delete(id);
        return "Deleted Successfully";
    }
}