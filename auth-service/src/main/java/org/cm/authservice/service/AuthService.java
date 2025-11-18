package org.cm.authservice.service;

import io.jsonwebtoken.JwtException;
import org.cm.authservice.dto.LoginRequestDTO;
import org.cm.authservice.dto.RegisterRequestDTO;
import org.cm.authservice.exception.EmailAlreadyExistsException;
import org.cm.authservice.model.User;
import org.cm.authservice.repository.UserRepository;
import org.cm.authservice.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public AuthService(UserService userService, PasswordEncoder passwordEncoder,  JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Optional<String> authenticate(LoginRequestDTO loginRequestDTO) {
        Optional<String> token = userService
                .findByEmail(loginRequestDTO.getEmail())
                .filter(u -> passwordEncoder.matches(loginRequestDTO.getPassword()
                        ,u.getPassword()))
                .map(u -> jwtUtil.generateToken(u.getEmail(), u.getRole()));

        return token;



    }

    public boolean validateToken(String token) {
        try {
            jwtUtil.validateToken(token);
            return true;

        }
        catch (JwtException e) {
            return false;
        }
    }

    public User register(RegisterRequestDTO registerRequestDTO) {
        if (userService.existsByEmail(registerRequestDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        User newUser = new User();
        newUser.setEmail(registerRequestDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        newUser.setRole(registerRequestDTO.getRole() != null ?
                registerRequestDTO.getRole() : "USER");
        newUser.setName(registerRequestDTO.getName());

        return userService.save(newUser);
    }
}

