package com.example.Staff.Repository;

import com.example.Staff.Entity.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepo extends JpaRepository<StaffEntity,Integer> {
    StaffEntity staffId(Integer staffId);
}
