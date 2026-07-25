package com.hospital.security;

import java.io.IOException;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtUtil jwtUtil;
	
	public JwtAuthenticationFilter(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}
	
	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain) throws ServletException, IOException {
		
		String path = request.getRequestURI();
		String method = request.getMethod();
		System.out.println("=== FILTER: Processing " + method + " request to: " + path + " ===");

		if ("OPTIONS".equalsIgnoreCase(method)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String token = extractToken(request);
		System.out.println("=== FILTER: Token " + (token != null ? "found" : "not found") + " ===");
		
		try {
			if (token != null && jwtUtil.isValidToken(token)) {
				String username = jwtUtil.extractUsername(token);
				String email = jwtUtil.extractEmail(token);
				String role = jwtUtil.extractRole(token);
				Long userId = jwtUtil.extractUserId(token);
				
				System.out.println("✓ Token validated for user: " + username + " (ID: " + userId + ", Role: " + role + ")");
				
				AuthenticatedUser authenticatedUser = new AuthenticatedUser(userId, username, email, role);
				
				UsernamePasswordAuthenticationToken authentication = 
					new UsernamePasswordAuthenticationToken(
						authenticatedUser, 
						null, 
						List.of(new SimpleGrantedAuthority("ROLE_" + role))
					);
				
				authentication.setDetails(
					new WebAuthenticationDetailsSource().buildDetails(request)
				);
				
				SecurityContextHolder.getContext().setAuthentication(authentication);
				System.out.println("=== FILTER: Authentication set in SecurityContext with role: ROLE_" + role + " ===");
			} else {
				System.out.println("=== FILTER: No valid token found, continuing without authentication ===");
			}
			
		} catch (ExpiredJwtException e) {
			System.out.println("=== FILTER: Token expired - " + e.getMessage() + " ===");
		} catch (Exception e) {
			System.out.println("=== FILTER: Token validation error - " + e.getMessage() + " ===");
		}
		
		filterChain.doFilter(request, response);
		System.out.println("=== FILTER: Request completed ===");
	}
	
	
	private String extractToken(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			return authHeader.substring(7);
		}
		
		String tokenParam = request.getParameter("token");
		if (tokenParam != null && !tokenParam.isEmpty()) {
			return tokenParam;
		}
		
		return null;
	}
}
