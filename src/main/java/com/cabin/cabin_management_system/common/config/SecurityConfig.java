package com.cabin.cabin_management_system.common.config;

import com.cabin.cabin_management_system.auth.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) ->
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"))
                        .accessDeniedHandler((request, response, accessDeniedException) ->
                                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden"))
                )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/error").permitAll()

                        // ==========================
                        // Cabin APIs
                        // ==========================

                        // Create Cabin -> Admin Only
                        .requestMatchers(HttpMethod.POST, "/api/cabins")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/cabins/*")
                        .hasRole("ADMIN")

                        // View Cabins -> Any Logged-in User
                        .requestMatchers(HttpMethod.GET, "/api/cabins/**")
                        .authenticated()

                        .requestMatchers(HttpMethod.PATCH,
                                "/api/cabins/*/deactivate")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PATCH,
                                "/api/cabins/*/activate")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/cabins/available")
                        .authenticated()

                        // ==========================
                        // Booking APIs
                        // ==========================

                        // Employee creates booking
                        .requestMatchers(HttpMethod.POST, "/api/bookings")
                        .hasRole("EMPLOYEE")

                        .requestMatchers(HttpMethod.GET, "/api/bookings/my")
                        .hasRole("EMPLOYEE")

                        // Admin/Manager view pending bookings
                        .requestMatchers(HttpMethod.GET, "/api/bookings/pending")
                        .hasAnyRole("ADMIN", "MANAGER")

                        // Admin/Manager approve booking
                        .requestMatchers(HttpMethod.PUT, "/api/bookings/*/approve")
                        .hasAnyRole("ADMIN", "MANAGER")

                        // Admin/Manager reject booking
                        .requestMatchers(HttpMethod.PUT, "/api/bookings/*/reject")
                        .hasAnyRole("ADMIN", "MANAGER")

                        .requestMatchers(HttpMethod.GET, "/api/bookings")
                        .hasAnyRole("ADMIN", "MANAGER")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/bookings/*/cancel")
                        .hasRole("EMPLOYEE")


                        .requestMatchers(HttpMethod.GET,
                                "/api/bookings/*")
                        .authenticated()


                        .requestMatchers(HttpMethod.GET, "/api/dashboard/**")
                        .hasAnyRole("ADMIN", "MANAGER")

                        .requestMatchers(HttpMethod.GET, "/api/dashboard/**")
                        .hasAnyRole("ADMIN", "MANAGER")

                        .requestMatchers(HttpMethod.GET,
                                "/api/admin/users/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST,
                                "/api/admin/users/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/admin/users/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PATCH,
                                "/api/admin/users/**")
                        .hasRole("ADMIN")
                        
                        // Everything else requires login
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}