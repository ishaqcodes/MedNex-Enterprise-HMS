package com.mednex.enterprise.config.tenant;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

// FIX: TenantContext same package me hai, isliye import ki zarurat nahi honi chahiye,
// lekin agar error aa raha hai to ensure karo dono same folder me hain.

@Component
public class SchemaCurrentTenantIdentifierResolver implements CurrentTenantIdentifierResolver<String> { // <--- <String> add kiya raw type warning hatane ke liye

    @Override
    public String resolveCurrentTenantIdentifier() {
        String tenantId = TenantContext.getTenantId(); // <--- Yahan error tha
        if (tenantId != null) {
            return tenantId;
        }
        return "public";
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }
}