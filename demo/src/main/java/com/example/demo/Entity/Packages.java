package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JoinColumnOrFormula;

@Entity
@Table(name="packages")
public class Packages {
    @Id
    private Integer code;
    @Column(name="package_details")
    private String packageDetails;
    private Float fees;
    private  String facilities;
    @Column(name = "o_details")
    private String oDetails;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getoDetails() {
        return oDetails;
    }

    public void setoDetails(String oDetails) {
        this.oDetails = oDetails;
    }

    public String getFacilities() {
        return facilities;
    }

    public void setFacilities(String facilities) {
        this.facilities = facilities;
    }

    public Float getFees() {
        return fees;
    }

    public void setFees(Float fees) {
        this.fees = fees;
    }

    public String getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(String packageDetails) {
        this.packageDetails = packageDetails;
    }

    public Packages(Integer code, String oDetails, Float fees, String packageDetails, String facilities) {
        this.code = code;
        this.oDetails = oDetails;
        this.fees = fees;
        this.packageDetails = packageDetails;
        this.facilities = facilities;
    }
}
