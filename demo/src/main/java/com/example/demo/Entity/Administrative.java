package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name =" administrative")
public class Administrative {
    @Id
    @Column(name = " admin_id ")
    private Integer adminId;
    @Column(name = "admin_name ")
    private String adminName;

    public Administrative() {
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public Administrative(Integer adminId, String adminName) {
        this.adminId = adminId;
        this.adminName = adminName;
    }
}
