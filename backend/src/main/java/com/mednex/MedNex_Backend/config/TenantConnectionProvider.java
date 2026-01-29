package com.mednex.mednex_backend.config;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.stereotype.Component;

@Component
public class TenantConnectionProvider implements MultiTenantConnectionProvider<String> { // <String> WAPAS LAGA DIYA

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
        Connection connection = getAnyConnection();
        System.out.println("🔌 DB Connection maanga gaya: " + tenantIdentifier + " ke liye");
        try (Statement statement = connection.createStatement()) {
            statement.execute("SET SEARCH_PATH TO " + tenantIdentifier);
            System.out.println("✅ Schema Switch kiya gaya -> " + tenantIdentifier);
        } catch (SQLException e) {
            connection.close();
            throw new RuntimeException("Could not switch schema: " + tenantIdentifier, e);
        }
        return connection;
    }

    @Override
    public void releaseConnection(String tenantIdentifier, Connection connection) throws SQLException {
        try (connection) {
            try (Statement statement = connection.createStatement()) {
                statement.execute("SET SEARCH_PATH TO public");
            } catch (SQLException e) {
                throw new RuntimeException("Could not reset schema", e);
            }
        }
    }

    @Override
    public boolean supportsAggressiveRelease() { return false; }

    @Override
    public boolean isUnwrappableAs(Class<?> unwrapType) { return false; }

    @Override
    public <T> T unwrap(Class<T> unwrapType) { return null; }
}