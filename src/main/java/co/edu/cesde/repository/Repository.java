package co.edu.cesde.repository;

import co.edu.cesde.model.Employee;

import java.sql.SQLException;
import java.util.List;

public interface Repository <T>{

    List<Employee> findAll() throws SQLException;

    List<T> finAll() throws SQLException;

    T getById(Integer id) throws SQLException;

    void save(T t) throws SQLException;

    void delete(String id) throws SQLException;

    void delete(Integer id) throws SQLException;
}
