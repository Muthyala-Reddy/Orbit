package com.demo.spring.repositories;

import com.demo.spring.entity.Emp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.net.InterfaceAddress;

public interface EmpRepository extends JpaRepository<Emp,Integer> {

    Emp EmpId(Integer empId);
}
