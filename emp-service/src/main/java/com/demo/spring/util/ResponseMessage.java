package com.demo.spring.util;

public class ResponseMessage {
    private String status;

    public ResponseMessage() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ResponseMessage(String status) {
        this.status = status;
    }
}
