package com.tbs.service;

import com.tbs.dto.AuthResponse;
import com.tbs.dto.LoginRequest;
import com.tbs.dto.RegisterRequest;
import com.tbs.dto.UserResponse;
import com.tbs.entity.User;
import com.tbs.repository.UserRepository;
import com.tbs.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                "CUSTOMER"
        );

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        UserResponse userResponse = new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new AuthResponse(token, userResponse);
    }

    public UserResponse getById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}











//package com.tbs.service;
//
//import com.tbs.dto.LoginRequest;
//import com.tbs.dto.RegisterRequest;
//import com.tbs.dto.UserResponse;
//import com.tbs.entity.User;
//import com.tbs.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public UserResponse register(RegisterRequest request) {
//
//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Email already exists");
//        }
//
//        User user = new User(request.getName(), request.getEmail(), request.getPassword(), "CUSTOMER");
//        User saved = userRepository.save(user);
//
//        return new UserResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
//    }
//
//    public UserResponse login(LoginRequest request) {
//
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//
//        if (!user.getPassword().equals(request.getPassword())) {
//            throw new RuntimeException("Invalid email or password");
//        }
//
//        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
//    }
//
//    public UserResponse getById(Long id) {
//
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
//    }
//}