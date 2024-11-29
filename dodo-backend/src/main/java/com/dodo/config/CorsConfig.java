package com.dodo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**") // Allow all endpoints
                        .allowedOrigins("*") // Allow requests from all origins for testing
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*"); // Allow all headers for testing
            }
        };
    }
}
