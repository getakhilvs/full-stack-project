package com.bytes.intern.ERRS.EmployeeController;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bytes.intern.ERRS.DTO.AchievementsDto;
import com.bytes.intern.ERRS.DTO.EmployeeDto;
import com.bytes.intern.ERRS.DTO.LoginDto;
import com.bytes.intern.ERRS.DTO.PointAllocationDto;
import com.bytes.intern.ERRS.DTO.TransactionDto;
import com.bytes.intern.ERRS.model.Achievement;
import com.bytes.intern.ERRS.model.Employee;

import com.bytes.intern.ERRS.model.ResponseHandler;
import com.bytes.intern.ERRS.model.TransactionCredit;
import com.bytes.intern.ERRS.model.TransactionDebit;
import com.bytes.intern.ERRS.service.EmployeeService;
import com.bytes.intern.ERRS.service.LoginService;
import com.bytes.intern.ERRS.service.TransactionService;




@RestController
@RequestMapping(value="/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@Autowired
	LoginService loginService;
	
	@Autowired
	TransactionService transactionService;
	
	@PostMapping("/add") 
	public Employee addEmployee(@RequestBody EmployeeDto employeeDto) {
		return employeeService.addEmployee(employeeDto);
	}
	
	@PostMapping("/login") 
	public Employee validateEmployee(@RequestBody LoginDto loginDto) {
		return loginService.validateEmployee(loginDto);
	}
	
	@PostMapping("/addPoints")
	public ResponseEntity<Object> addTransactionCredit(@RequestBody List<TransactionDto> transactionDtoList) { 
		transactionService.addTransactionCredit(transactionDtoList);
		 return ResponseHandler.generateResponse("Successfully added data!", HttpStatus.OK, null);
	}
	
	@GetMapping("/getemployees")
	public List<Employee> getEmployeeList(){
		return employeeService.getEmployeeList();
	}
	
	@GetMapping("/getcredit")
	public List<TransactionCredit> getCreditList(){
		return transactionService.getCreditList();
	}
	
	@PostMapping("/achievement")
	public Achievement addAchievement(@RequestBody AchievementsDto achivementDto) {
		return employeeService.addAchievement(achivementDto);
	}
	
	@PostMapping("/getperformance")
	public List<TransactionCredit> getPerformance(@RequestBody int employeeId){
		return transactionService.getPerformance(employeeId);
	}
	@PostMapping("/getDetails")
	public Employee getDetails(@RequestBody int employeeId){
		return employeeService.getDetails(employeeId);
	}
	@GetMapping("/getbestemployees")
	public List<Employee> getBestEmployeesList(){
		return employeeService.getBestEmployeeList();
	}
	
	@PostMapping("/getmyorders")
	public List<TransactionDebit> getMyOrders(@RequestBody long employeeId){
		return transactionService.getMyOrders(employeeId);
	}
	@GetMapping("/getdebit")
	public List<TransactionDebit> getdebitlist(){
		return transactionService.getDebitList();
	}
	
	
	@PostMapping("/addreward")
	
	public ResponseEntity<?> addReward(@RequestBody PointAllocationDto pointAllocationDto){
		
	return employeeService.addReward(pointAllocationDto);
	}
	@GetMapping("/getachievement")
	public List<Achievement> getAchievementList(){
		return employeeService.getAchievementList();
	}
}
