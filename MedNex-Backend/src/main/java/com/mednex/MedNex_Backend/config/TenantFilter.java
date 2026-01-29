package com.mednex.MedNex_Backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class TenantFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String path = request.getRequestURI();
        if (path.startsWith("/api")) {
            System.out.println("🛑 DEBUG [Filter]: Request received for -> " + path);
            
            String tenantId = request.getHeader("X-TenantID");
            System.out.println("🛑 DEBUG [Filter]: Found X-TenantID Header -> " + tenantId);

            if (tenantId != null && !tenantId.isEmpty()) {
                TenantContext.setTenantId(tenantId);
            } else {
                System.out.println("⚠️ WARNING [Filter]: No Tenant ID found in Header!");
            }
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}