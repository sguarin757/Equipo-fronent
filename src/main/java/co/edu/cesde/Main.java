package co.edu.cesde;

import co.edu.cesde.model.Employee;
import co.edu.cesde.repository.EmployeeRepository;
import co.edu.cesde.repository.Repository;
import co.edu.cesde.util.DateBaseConnection;

import javax.sound.midi.Soundbank;
import java.sql.*;

public class Main {
    public static void main(String[] args) throws SQLException {

        System.out.println("---Listando todo---");
        Repository<Employee> repository = new EmployeeRepository();
        repository.findAll().forEach(System.out::println);

        System.out.println("---Buscando por 10---");
        System.out.println(repository.getById(2));

     }
}

