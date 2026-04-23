package com.demo.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "EMPLOYEE")
public class Emp {
    @Id
    @Column(name = "empno")
    private Integer empId;
    private String name;
    @Column(name = "address")
    private String city;
    private Double salary;
    @Column(name = "dno")
    private Integer deptNo;

    public Emp() {
    }

    public Emp(String name, Integer empId, Double salary, String city, Integer deptNo) {
        this.name = name;
        this.empId = empId;
        this.salary = salary;
        this.city = city;
        this.deptNo = deptNo;
    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }


//    public void setSetDeptNo(Integer deptNo) {this.deptNo = deptNo;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Integer getDeptNo() {
        return deptNo;
    }

    public void setDeptNo(Integer deptNo) {
        this.deptNo = deptNo;
    }
}
