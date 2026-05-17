package com.tbs.controller;

import com.tbs.dto.AuthResponse;
import com.tbs.dto.LoginRequest;
import com.tbs.dto.RegisterRequest;
import com.tbs.dto.UserResponse;
import com.tbs.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getById(id);
    }


}







//package com.tbs.controller;
//
//import com.tbs.dto.LoginRequest;
//import com.tbs.dto.RegisterRequest;
//import com.tbs.dto.UserResponse;
//import com.tbs.service.UserService;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @PostMapping("/signup")
//    public UserResponse register(@RequestBody RegisterRequest request) {
//        return userService.register(request);
//    }
//
//    @PostMapping("/login")
//    public UserResponse login(@RequestBody LoginRequest request) {
//        return userService.login(request);
//    }
//
//    @GetMapping("/{id}")
//    public UserResponse getUser(@PathVariable Long id) {
//        return userService.getById(id);
//    }
//}