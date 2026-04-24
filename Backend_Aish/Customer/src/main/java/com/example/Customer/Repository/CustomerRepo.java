package com.example.Customer.Repository;

import com.example.Customer.Entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<CustomerEntity,Integer> {
    CustomerEntity vId(Integer vId);
}
