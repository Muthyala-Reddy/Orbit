package com.example.Admin.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name =" administrative")
public class AdminEntity {
    @Id
    @Column(name = " admin_id ")
    private Integer adminId;
    @Column(name = "admin_name ")
    private String adminName;

    public AdminEntity() {
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

    public AdminEntity(Integer adminId, String adminName) {
        this.adminId = adminId;
        this.adminName = adminName;
    }
}
