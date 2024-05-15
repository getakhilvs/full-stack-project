package com.bytes.intern.ERRS.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="employee")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long employeeId;
	
	private String employeeFirstName;
	
	private String employeeLastName;
	private int employeeAge;

	private String employeeGender;
	
	private String email;
	private String employeePosition;
	private String employeePassword;
	private String employeeRole;
	
	@Column
	private Long employeeTotalPoints;
	
	private Long employeeTotalDebitPoints;
	
	public String getEmployeeRole() {
		return employeeRole;
	}
	public void setEmployeeRole(String employeeRole) {
		this.employeeRole = employeeRole;
	}
	
	
	
	public long getEmployeeTotalDebitPoints() {
		return employeeTotalDebitPoints;
	}
	public void setEmployeeTotalDebitPoints(long employeeTotalDebitPoints) {
		this.employeeTotalDebitPoints = employeeTotalDebitPoints;
	}
	public long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeFirstName() {
		return employeeFirstName;
	}
	public void setEmployeeFirstName(String employeeFirstName) {
		this.employeeFirstName = employeeFirstName;
	}
	public String getEmployeeLastName() {
		return employeeLastName;
	}
	public void setEmployeeLastName(String employeeLastName) {
		this.employeeLastName = employeeLastName;
	}
	public int getEmployeeAge() {
		return employeeAge;
	}
	public void setEmployeeAge(int employeeAge) {
		this.employeeAge = employeeAge;
	}

	public String getEmployeeGender() {
		return employeeGender;
	}
	public void setEmployeeGender(String employeeGender) {
		this.employeeGender = employeeGender;
	}
	
	public String email() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmployeePosition() {
		return employeePosition;
	}
	public void setEmployeePosition(String employeePosition) {
		this.employeePosition = employeePosition;
	}
	public String getEmployeePassword() {
		return employeePassword;
	}
	public void setEmployeePassword(String employeePassword) {
		this.employeePassword = employeePassword;
	} 
	public Long getEmployeeTotalPoints() {
		return employeeTotalPoints;
	}
	public void setEmployeeTotalPoints(Long employeeTotalPoints) {
		this.employeeTotalPoints = employeeTotalPoints;
	}
	public void setAge(int age) {
		this.employeeAge=age;
	}
	
	
}
