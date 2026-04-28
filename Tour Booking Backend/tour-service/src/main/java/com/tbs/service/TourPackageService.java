package com.tbs.service;

import com.tbs.dto.TourPackageRequest;
import com.tbs.dto.TourPackageResponse;
import com.tbs.entity.TourPackage;
import com.tbs.repository.TourPackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourPackageService {

    private final TourPackageRepository tourPackageRepository;

    public TourPackageService(TourPackageRepository tourPackageRepository) {
        this.tourPackageRepository = tourPackageRepository;
    }

    public TourPackageResponse create(TourPackageRequest request) {

        TourPackage tourPackage = new TourPackage(
                request.getTitle(),
                request.getDescription(),
                request.getPrice(),
                request.getDurationDays()
        );

        TourPackage saved = tourPackageRepository.save(tourPackage);

        return new TourPackageResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getPrice(),
                saved.getDurationDays()
        );
    }

    public List<TourPackageResponse> getAll() {

        return tourPackageRepository.findAll()
                .stream()
                .map(tp -> new TourPackageResponse(
                        tp.getId(),
                        tp.getTitle(),
                        tp.getDescription(),
                        tp.getPrice(),
                        tp.getDurationDays()
                ))
                .toList();
    }

    public TourPackageResponse getById(Long id) {

        TourPackage tp = tourPackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour Package not found"));

        return new TourPackageResponse(
                tp.getId(),
                tp.getTitle(),
                tp.getDescription(),
                tp.getPrice(),
                tp.getDurationDays()
        );
    }

    public TourPackageResponse update(Long id, TourPackageRequest request) {

        TourPackage tp = tourPackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour Package not found"));

        tp.setTitle(request.getTitle());
        tp.setDescription(request.getDescription());
        tp.setPrice(request.getPrice());
        tp.setDurationDays(request.getDurationDays());

        TourPackage saved = tourPackageRepository.save(tp);

        return new TourPackageResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getPrice(),
                saved.getDurationDays()
        );
    }

    public void delete(Long id) {
        tourPackageRepository.deleteById(id);
    }
}