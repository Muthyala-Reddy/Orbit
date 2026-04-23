package com.demo.spring.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;

@RestController
@RequestMapping("/demo")
public class GreetController {

    @GetMapping(path="/greet/{name}",produces = MediaType.TEXT_PLAIN_VALUE)
    public String greet(@PathVariable("name") String userName){
        return "hello " +   userName;
    }
}
