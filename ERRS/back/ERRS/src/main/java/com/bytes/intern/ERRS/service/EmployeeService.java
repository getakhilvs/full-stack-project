package com.bytes.intern.ERRS.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.bytes.intern.ERRS.DTO.AchievementsDto;
import com.bytes.intern.ERRS.DTO.EmployeeDto;
import com.bytes.intern.ERRS.DTO.PointAllocationDto;
import com.bytes.intern.ERRS.model.Achievement;
import com.bytes.intern.ERRS.model.Employee;

public interface EmployeeService {
	public Employee addEmployee(EmployeeDto employeeDto);

	public List<Employee> getEmployeeList();

	public List<Employee> getBestEmployeeList();

	

	public Achievement addAchievement(AchievementsDto achivementDto);

	public ResponseEntity<?> addReward(PointAllocationDto pointAllocationDto);

	public List<Achievement> getAchievementList();

	public Employee getDetails(long employeeId);

	

}
