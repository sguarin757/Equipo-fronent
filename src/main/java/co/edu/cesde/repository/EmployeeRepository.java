package co.edu.cesde.repository;

import co.edu.cesde.model.Employee;
import co.edu.cesde.util.DateBaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmployeeRepository implements Repository<Employee> {

    private Connection getConnection() throws SQLException {
        return DateBaseConnection.getConnection();
    }



    @Override
    public List<Employee> findAll() throws SQLException {
        List<Employee> employees = new ArrayList<>();
        String sql = "SELECT * FROM employees";

        try (Connection myConn = getConnection();
                PreparedStatement myStamt = myConn.prepareStatement(sql);
             ResultSet myRes = myStamt.executeQuery()) {
            while (myRes.next()) {
                employees.add(createEmployee(myRes));
            }
        }
        return employees;
    }

    @Override
    public List<Employee> finAll() throws SQLException {
        return List.of();
    }

    @Override
    public Employee getById(Integer id) throws SQLException {
        Employee employee = null;
        String sql = "SELECT * FROM employees WHERE id = ?";
        try ( Connection myConn = getConnection();
                PreparedStatement myStamt = myConn.prepareStatement(sql)) {
            myStamt.setInt(1, id);
            try (ResultSet myRes = myStamt.executeQuery()) {
                if (myRes.next()) {
                    employee = createEmployee(myRes);
                }
            }
        }
        return employee;
    }

    @Override
    public void save(Employee employee) {
        String sql;
        boolean isUpdate = (employee.getId() != null && employee.getId() > 0);

        if (isUpdate) {
            sql = "UPDATE employees SET first_name =?, pa_surname=?, ma_surname=?, email=?, salary=?, curp=?, WHERE id=?";
        } else {
            sql = "INSERT INTO employees(first_name, pa_surname, ma_surname, email, salary, curp) VALUES(?,?,?,?,?,?)";
        }

        try ( Connection myConn = getConnection();
                PreparedStatement myStamt = myConn.prepareStatement(sql)) {
            myStamt.setString(1, employee.getFirst_name());
            myStamt.setString(2, employee.getPa_surname());
            myStamt.setString(3, employee.getMa_surname());
            myStamt.setString(4, employee.getEmail());
            myStamt.setFloat(5, employee.getSalary());
            myStamt.setString(6, employee.getcurp);

            if (isUpdate) {
                myStamt.setInt(7, employee.getId());
            }

            myStamt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error al guardar empleado", e);
        }
    }

    @Override
    public void delete(String id) throws SQLException {

    }

    @Override
    public void delete(Integer id) throws SQLException {
        String sql = "DELETE FROM employees WHERE id = ?";
        try (Connection myConn = getConnection();
                PreparedStatement myStamt = myConn.prepareStatement(sql)) {
            myStamt.setInt(1, id);
            myStamt.executeUpdate();
        }
    }

    private Employee createEmployee(ResultSet myRes) throws SQLException {
        Employee e = new Employee();
        e.setId(myRes.getInt("id"));
        e.setFirst_name(myRes.getString("first_name"));
        e.setPa_surname(myRes.getString("pa_surname"));
        e.setMa_surname(myRes.getString("ma_surname"));
        e.setEmail(myRes.getString("email"));
        e.setSalary(myRes.getFloat("salary"));
        e.setCurp(myRes.getString("curp"));
        return e;
    }
}