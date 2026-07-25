package com.hospital.security;

import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Custom Access Denied Handler
 * Returns JSON error response when user tries to access unauthorized endpoints
 */
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {
        
        System.out.println("=== ACCESS DENIED: User tried to access: " + request.getRequestURI() + " ===");
        
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String jsonResponse = String.format(
            "{\"success\":false,\"error\":\"Access Denied\",\"message\":\"You don't have permission to access this resource\",\"path\":\"%s\"}",
            request.getRequestURI()
        );
        
        response.getWriter().write(jsonResponse);
    }
}
