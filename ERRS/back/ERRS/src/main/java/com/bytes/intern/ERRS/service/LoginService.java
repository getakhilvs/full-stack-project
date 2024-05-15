package com.bytes.intern.ERRS.service;

import com.bytes.intern.ERRS.DTO.LoginDto;
import com.bytes.intern.ERRS.model.Employee;

public interface LoginService {
	Employee validateEmployee(LoginDto loginDto);
}
