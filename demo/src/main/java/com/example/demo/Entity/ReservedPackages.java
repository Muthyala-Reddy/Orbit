package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="reserved_package ")
public class ReservedPackages {
    @Column(name ="p_id  ")
    private Integer pId;
    @Column(name =" v_id  ")
    private Integer  vId;
    private Integer code;
    @Column(name =" staff_id")
    private Integer staffId;
    @Column(name ="no_of_customers ")
    private Integer noOfCustomers;
    @Column(name =" package_standard")
    private String packageStandard;

    public Integer getpId() {
        return pId;
    }

    public void setpId(Integer pId) {
        this.pId = pId;
    }

    public String getPackageStandard() {
        return packageStandard;
    }

    public void setPackageStandard(String packageStandard) {
        this.packageStandard = packageStandard;
    }

    public Integer getNoOfCustomers() {
        return noOfCustomers;
    }

    public void setNoOfCustomers(Integer noOfCustomers) {
        this.noOfCustomers = noOfCustomers;
    }

    public Integer getStaffId() {
        return staffId;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public Integer getvId() {
        return vId;
    }

    public void setvId(Integer vId) {
        this.vId = vId;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public ReservedPackages(String packageStandard, Integer pId, Integer staffId, Integer noOfCustomers, Integer code, Integer vId) {
        this.packageStandard = packageStandard;
        this.pId = pId;
        this.staffId = staffId;
        this.noOfCustomers = noOfCustomers;
        this.code = code;
        this.vId = vId;
    }
}
