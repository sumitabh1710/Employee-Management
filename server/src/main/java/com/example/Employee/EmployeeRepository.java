package com.example.Employee;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    @Transactional
    @Query(value = "SELECT * FROM employee WHERE employee.email = :email", nativeQuery = true)
    Employee findByEmail(@Param("email") String email);

}