package com.hospital.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hospital.security.CustomAccessDeniedHandler;
import com.hospital.security.CustomAuthenticationEntryPoint;
import com.hospital.security.JwtAuthenticationFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;
    
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          CustomAccessDeniedHandler accessDeniedHandler,
                          CustomAuthenticationEntryPoint authenticationEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.accessDeniedHandler = accessDeniedHandler;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Exception handling for authentication and authorization errors
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(authenticationEntryPoint)  // 401 - Not authenticated
                .accessDeniedHandler(accessDeniedHandler)            // 403 - Not authorized
            )
            
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register/**",
                    "/api/auth/health",
                    "/api/auth/validate"
                ).permitAll()
                .requestMatchers(
                    "/api/admins/**",
                    "/api/statistics/**"
                ).hasRole("Admin")
                .requestMatchers(
                    "/api/doctors/{id}/dashboard-stats",
                    "/api/doctors/{id}/generate-slots",
                    "/api/doctors/{id}/all-slots"
                ).hasRole("Doctor")
                .requestMatchers(
                    "/api/patients/{id}/dashboard-stats"
                ).hasRole("Patient")
                .requestMatchers(
                    "/api/nurses/**"
                ).hasAnyRole("Nurse", "Admin")
                .requestMatchers(
                    "/api/appointments/**"
                ).hasAnyRole("Doctor", "Admin")
                .requestMatchers(
                    "/api/doctors",
                    "/api/doctors/{id}",
                    "/api/doctors/{id}/available-slots",
                    "/api/doctors/{id}/booked-slots",
                    "/api/doctors/{id}/appointments"
                ).hasAnyRole("Doctor", "Patient", "Admin", "Nurse")
                .requestMatchers(
                    "/api/patients/**"
                ).hasAnyRole("Doctor", "Patient", "Admin", "Nurse")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L); // Cache preflight response for 1 hour
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
