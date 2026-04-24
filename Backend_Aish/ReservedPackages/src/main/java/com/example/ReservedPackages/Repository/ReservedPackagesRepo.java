package com.example.ReservedPackages.Repository;

import com.example.ReservedPackages.Entity.ReservedPackagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservedPackagesRepo extends JpaRepository<ReservedPackagesEntity,Integer> {
    ReservedPackagesEntity pId(Integer pId);
}
