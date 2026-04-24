package com.example.Packages.Repository;

import com.example.Packages.Entity.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepo extends JpaRepository<PackageEntity,Integer> {
    PackageEntity code(Integer code);
}
