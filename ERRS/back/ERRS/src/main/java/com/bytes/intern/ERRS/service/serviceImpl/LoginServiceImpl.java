package com.bytes.intern.ERRS.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bytes.intern.ERRS.DAO.EmployeeDao;
import com.bytes.intern.ERRS.DTO.LoginDto;
import com.bytes.intern.ERRS.model.Employee;
import com.bytes.intern.ERRS.service.LoginService;


@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	EmployeeDao employeeDao;
	
   
	@Override
	public Employee validateEmployee(LoginDto loginDto) {
		String email = loginDto.getEmail();
        Employee employee= employeeDao.findByEmail(email);
        if(employee!=null ) {
        	if(employee.getEmployeePassword().equals(loginDto.getPassword())) {
        		return employee;
        	}else {
        		return null;
        	}
        }else {
        	return null;
        }
        
	}	
}