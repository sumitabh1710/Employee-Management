package com.example.Employee;

public class AddEmployeeDto {
    private String name;
    private String email;
    private String roleName;

    // Default constructor
    public AddEmployeeDto() {
        }

    // Parameterized constructor
    public AddEmployeeDto(String name, String email, String roleName) {
            this.name = name;
            this.email = email;
            this.roleName = roleName;
        }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

}
