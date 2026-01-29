package com.mednex.MedNex_Backend.config;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class TenantConfig implements BeanPostProcessor {

    @Autowired
    private MultiTenantConnectionProvider<String> connectionProvider;

    @Autowired
    private CurrentTenantIdentifierResolver<String> tenantResolver;

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // Hum Hibernate ke Factory Bean ko pakad kar usme settings daal rahe hain
        if (bean instanceof LocalContainerEntityManagerFactoryBean) {
            LocalContainerEntityManagerFactoryBean emf = (LocalContainerEntityManagerFactoryBean) bean;
            
            Map<String, Object> map = new HashMap<>();
            map.put("hibernate.multiTenancy", "SCHEMA");
            map.put("hibernate.multi_tenant_connection_provider", connectionProvider);
            map.put("hibernate.multi_tenant_identifier_resolver", tenantResolver);
            
            // Purani properties ke saath merge karte hain
            emf.setJpaPropertyMap(map);
        }
        return bean;
    }
}