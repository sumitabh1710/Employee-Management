package com.example.Employee;

import java.util.Optional;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import io.micrometer.common.lang.NonNull;

@Controller
@RequestMapping(path = "/demo")
public class EmployeeController {
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private RoleRepository roleRepository;

  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping(path = "/add")
  public @ResponseBody ResponseEntity<Employee> addNewUser(
      @RequestBody AddEmployeeDto addEmployeeDto) {
    Employee newEmployee = new Employee();
    Role role = roleRepository.getRoleByName(addEmployeeDto.getRoleName());
    newEmployee.setRole_id(role);
    newEmployee.setName(addEmployeeDto.getName());
    newEmployee.setEmail(addEmployeeDto.getEmail());
    employeeRepository.save(newEmployee);
    return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @PutMapping(path = "/add")
  public @ResponseBody ResponseEntity<Employee> updateUser(@RequestParam(name = "id", required = true) Integer id,
      @RequestBody AddEmployeeDto addEmployeeDto) {
    Optional<Employee> existingEmployeeOptional = employeeRepository.findById(id);
    Employee existingEmployee = existingEmployeeOptional.get();
    Role role = roleRepository.getRoleByName(addEmployeeDto.getRoleName());
    existingEmployee.setRole_id(role);
    existingEmployee.setName(addEmployeeDto.getName());
    existingEmployee.setEmail(addEmployeeDto.getEmail());
    employeeRepository.save(existingEmployee);
    return new ResponseEntity<>(existingEmployee, HttpStatus.OK);
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @DeleteMapping(path = "/delete")
  public @ResponseBody ResponseEntity<Void> deleteUser(@RequestParam(name = "id", required = true) Integer id) {
    try {
      employeeRepository.deleteById(id);
      return ResponseEntity.ok().build();
    } catch (EmptyResultDataAccessException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping(path = "/all")
  public @ResponseBody Iterable<Employee> getAllEmployees() {
    return employeeRepository.findAll();
  }

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping(path = "/roles")
  public @ResponseBody Role getAllEmployees(@RequestParam("role_name") String role_name) {
    return roleRepository.getRoleByName(role_name);
  }
}