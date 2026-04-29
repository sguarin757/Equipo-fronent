package co.edu.cesde.util;

import org.apache.commons.dbcp2.BasicDataSource;

import java.sql.DriverManager;
import java.sql.SQLException;
import org.apache.commons.dbcp2.BasicDataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class DateBaseConnection {
    private static String url = "jdbc:mysql://localhost:3306/project";
    private static String user = "root";
    private static String pass = "";
    // Corregido: BasicDataSource (con 'a')
    private static BasicDataSource pool;

    public static BasicDataSource getDataSource() {
        if (pool == null) {
            pool = new BasicDataSource();
            pool.setUrl(url);
            pool.setUsername(user);
            pool.setPassword(pass);

            // Configuraciones opcionales pero recomendadas para el pool
            pool.setInitialSize(3);      // Cuántas conexiones se abren al inicio
            pool.setMinIdle(3);         // Conexiones mínimas inactivas
            pool.setMaxIdle(10);        // Conexiones máximas inactivas
            pool.setMaxTotal(10);       // Máximo de conexiones totales
        }
        return pool;
    }

    // Método para obtener la conexión directamente del pool
    public static Connection getConnection() throws SQLException {
        return getDataSource().getConnection();
    }
}