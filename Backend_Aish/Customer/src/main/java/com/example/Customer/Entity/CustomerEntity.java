package com.example.Customer.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer ")
public class CustomerEntity {
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

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(Integer phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public Integer getvId() {
        return vId;
    }

    public void setvId(Integer vId) {
        this.vId = vId;
    }

    public CustomerEntity(String fName, Integer vId, Integer age, String address, String sex, String city, Integer phoneNo, String email, String lName, String name, Integer adminId) {
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
