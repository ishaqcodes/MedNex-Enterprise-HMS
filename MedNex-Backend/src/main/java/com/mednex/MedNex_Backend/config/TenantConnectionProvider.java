package com.mednex.MedNex_Backend.config;

import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class TenantConnectionProvider implements MultiTenantConnectionProvider<String> {

    private final DataSource dataSource;

    public TenantConnectionProvider(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Connection getAnyConnection() throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public void releaseAnyConnection(Connection connection) throws SQLException {
        connection.close();
    }

    @Override
    public Connection getConnection(String tenantIdentifier) throws SQLException {
        System.out.println("🛑 DEBUG [DB Connection]: Switching Schema to -> " + tenantIdentifier);
        
        Connection connection = getAnyConnection();
        try (Statement statement = connection.createStatement()) {
            statement.execute("SET SEARCH_PATH TO " + tenantIdentifier);
        } catch (SQLException e) {
            System.out.println("❌ ERROR [DB Connection]: Failed to set schema!");
            e.printStackTrace();
            connection.close();
            throw new RuntimeException("Could not switch to schema: " + tenantIdentifier, e);
        }
        return connection;
    }

    @Override
    public void releaseConnection(String tenantIdentifier, Connection connection) throws SQLException {
        try (connection) {
            try (Statement statement = connection.createStatement()) {
                statement.execute("SET SEARCH_PATH TO public");
            }
        }
    }

    @Override
    public boolean supportsAggressiveRelease() {
        return false;
    }

    @Override
    public boolean isUnwrappableAs(Class<?> unwrapType) {
        return false;
    }

    @Override
    public <T> T unwrap(Class<T> unwrapType) {
        return null;
    }
}