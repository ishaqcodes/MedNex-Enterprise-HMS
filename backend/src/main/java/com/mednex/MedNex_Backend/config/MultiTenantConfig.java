package com.mednex.mednex_backend.config;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class MultiTenantConfig {

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(
            MultiTenantConnectionProvider<String> connectionProvider,
            CurrentTenantIdentifierResolver<String> tenantResolver) {

        return new HibernatePropertiesCustomizer() {
            @Override
            public void customize(Map<String, Object> hibernateProperties) {
                // Hibernate ko bolo: "Multi-tenancy ON hai"
                hibernateProperties.put("hibernate.multiTenancy", "SCHEMA");
                
                // FORCE: Humara provider use karo
                hibernateProperties.put("hibernate.multi_tenant_connection_provider", connectionProvider);
                hibernateProperties.put("hibernate.tenant_connection_provider", connectionProvider); // Safety ke liye dono keys
                
                // FORCE: Humara resolver use karo
                hibernateProperties.put("hibernate.multi_tenant_identifier_resolver", tenantResolver);
                hibernateProperties.put("hibernate.tenant_identifier_resolver", tenantResolver);
            }
        };
    }
}