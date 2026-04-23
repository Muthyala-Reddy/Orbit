package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @Column(name="staff_id ")
    private Integer staffId;
    @Column(name="staff_name")
    private String staffName;
    private Integer salary;
    @Column(name = "contact_no")
    private Integer contactNo;
    @Column(name = "admin_id" )
    private Integer adminId;

    public Staff(Integer staffId, Integer adminId, Integer contactNo, Integer salary, String staffName) {
        this.staffId = staffId;
        this.adminId = adminId;
        this.contactNo = contactNo;
        this.salary = salary;
        this.staffName = staffName;
    }

    public Staff() {
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public Integer getStaffId() {
        return staffId;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public Integer getContactNo() {
        return contactNo;
    }

    public void setContactNo(Integer contactNo) {
        this.contactNo = contactNo;
    }
}
