package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer ")
public class Customer {
    @Id
    @Column(name="v_id ")
    private Integer vId;
    @Column(name="f_name ")
    private String fName;
    @Column(name="l_name ")
    private String lName;
    private String name;
    private Integer age;
    @Column(name ="phone_no")
    private Integer phoneNo;
    private String email;
    private String city;
    private String address;
    private String sex;
    @Column(name="admin_id")
    private Integer adminId;

    public Customer(String fName, Integer vId, Integer age, String address, String sex, String city, Integer phoneNo, String email, String lName, String name, Integer adminId) {
        this.fName = fName;
        this.vId = vId;
        this.age = age;
        this.address = address;
        this.sex = sex;
        this.city = city;
        this.phoneNo = phoneNo;
        this.email = email;
        this.lName = lName;
        this.name = name;
        this.adminId = adminId;
    }
}
