package com.hospital.service;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hospital.dto.LoginRequest;
import com.hospital.dto.LoginResponse;
import com.hospital.model.Admin;
import com.hospital.security.JwtUtil;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AdminService adminService;

    @Mock
    private DoctorService doctorService;

    @Mock
    private PatientService patientService;

    @Mock
    private NurseService nurseService;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void loginWithPlainTextPasswordShouldSucceed() {
        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("admin123");
        request.setRole("Admin");

        Admin admin = new Admin();
        admin.setId(1L);
        admin.setUsername("admin");
        admin.setName("System Administrator");
        admin.setEmail("admin@hospital.com");
        admin.setPassword("admin123");

        when(adminService.findByUsername("admin")).thenReturn(admin);
        when(passwordEncoder.matches("admin123", "admin123")).thenReturn(true);
        when(jwtUtil.generateToken("admin", "Admin", "System Administrator")).thenReturn("token");

        LoginResponse response = authService.login(request);

        assertTrue(response.isSuccess());
    }
}
