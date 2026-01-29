package com.mednex.MedNex_Backend.config;

public class TenantContext {
    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();

    public static void setTenantId(String tenantId) {
        System.out.println("🛑 DEBUG [Context]: Setting Tenant ID -> " + tenantId);
        CURRENT_TENANT.set(tenantId);
    }

    public static String getTenantId() {
        String tenantId = CURRENT_TENANT.get();
        // System.out.println("🛑 DEBUG [Context]: Getting Tenant ID -> " + tenantId); 
        // (Upar wali line comment rakhi hai taaki console spam na ho)
        return tenantId;
    }

    public static void clear() {
        System.out.println("🛑 DEBUG [Context]: Clearing Tenant ID");
        CURRENT_TENANT.remove();
    }
}