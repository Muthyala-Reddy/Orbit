package com.example.Admin.Repository;

import com.example.Admin.Entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<AdminEntity,Integer> {
    AdminEntity adminId(Integer adminId);
}
