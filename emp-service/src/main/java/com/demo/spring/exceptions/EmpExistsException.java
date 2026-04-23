package com.demo.spring.exceptions;

public class EmpExistsException extends EmpResourceException{

    public EmpExistsException(String message) {
        super(message);
    }


}
