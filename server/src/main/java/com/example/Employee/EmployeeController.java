package com.example.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/demo")
public class EmployeeController {
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private RoleRepository roleRepository;

  @CrossOrigin(origins = "http://localhost:3000")
  @PostMapping(path = "/add")
  public @ResponseBody ResponseEntity<Employee> addNewUser(@RequestBody AddEmployeeDto addEmployeeDto) {
     Employee existingEmployee = employeeRepository.findByEmail(addEmployeeDto.getEmail());

        if (existingEmployee == null) {
            Employee newEmployee = new Employee();
            Role role = roleRepository.getRoleByName(addEmployeeDto.getRoleName());
            newEmployee.setRole_id(role);
            newEmployee.setName(addEmployeeDto.getName());
            newEmployee.setEmail(addEmployeeDto.getEmail());
            employeeRepository.save(newEmployee);
            return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
        } else {
            Role role = roleRepository.getRoleByName(addEmployeeDto.getRoleName());
            existingEmployee.setRole_id(role);
            existingEmployee.setName(addEmployeeDto.getName());
            employeeRepository.save(existingEmployee);
            return new ResponseEntity<>(existingEmployee, HttpStatus.OK);
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