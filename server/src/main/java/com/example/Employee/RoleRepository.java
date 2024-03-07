package com.example.Employee;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    @Query(value = "SELECT * FROM role WHERE role.name = :name", nativeQuery = true)
    Role getRoleByName(@Param("name") String name);
}
