package com.hospital.security;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Custom Authentication Entry Point
 * Returns JSON error response when user is not authenticated
 */
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        
        System.out.println("=== AUTHENTICATION REQUIRED: " + request.getRequestURI() + " ===");
        
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String jsonResponse = String.format(
            "{\"success\":false,\"error\":\"Unauthorized\",\"message\":\"Authentication is required to access this resource\",\"path\":\"%s\"}",
            request.getRequestURI()
        );
        
        response.getWriter().write(jsonResponse);
    }
}
