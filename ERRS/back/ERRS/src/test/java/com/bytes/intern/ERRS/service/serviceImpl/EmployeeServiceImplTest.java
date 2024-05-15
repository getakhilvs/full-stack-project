package com.bytes.intern.ERRS.service.serviceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.bytes.intern.ERRS.DAO.EmployeeDao;
import com.bytes.intern.ERRS.DTO.EmployeeDto;
import com.bytes.intern.ERRS.model.Employee;
@SpringBootTest
class EmployeeServiceImplTest {



    private EmployeeDao employeeDaoMock;

    @InjectMocks
    private EmployeeServiceImpl employeeService;
    

    @Test
    public void testAddEmployee_Success() {
        
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setFirstName("Akhil");
        employeeDto.setLastName("V S");
        employeeDto.setEmail("Akhilvs@gmail.com");
        employeeDto.setAge(30);
        employeeDto.setPosition("Software Engineer");
        employeeDto.setPassword("password");
        employeeDto.setGender("Male");

        when(employeeDaoMock.findByEmail("Akhilvs@gmail.com")).thenReturn(null);
        when(employeeDaoMock.save(any(Employee.class))).thenReturn(new Employee());

        Employee result = employeeService.addEmployee(employeeDto);

//        assertEquals("Akhil", result.getEmployeeFirstName());
        assertEquals("password", result.getEmployeePassword());

        verify(employeeDaoMock, times(1)).findByEmail("Akhilvs@gmail.com");
        verify(employeeDaoMock, times(1)).save(any(Employee.class));
    }

    @Test
    public void testAddEmployee_Failure_EmailAlreadyExists() {

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmail("Akhilvs@gmail.com");

        when(employeeDaoMock.findByEmail("Akhilvs@gmail.com")).thenReturn(new Employee());

        Employee result = employeeService.addEmployee(employeeDto);

        assertNull(result);

        verify(employeeDaoMock, times(1)).findByEmail("Akhilvs@gmail.com");
        verify(employeeDaoMock, never()).save(any(Employee.class));
    }
    @Test
    public void testGetEmployeeList() {
       
        Employee emp1 = new Employee();
        emp1.setEmployeeId(1);
        emp1.setEmployeeFirstName("Akhil");
        Employee emp2 = new Employee();
        emp2.setEmployeeId(2);
        emp2.setEmployeeFirstName("Gokul");
        List<Employee> mockEmployeeList = Arrays.asList(emp1, emp2);
        when(employeeDaoMock.findAll()).thenReturn(mockEmployeeList);

        List<Employee> result = employeeService.getEmployeeList();

        assertEquals(2, result.size());
        assertEquals("Akhil", result.get(0).getEmployeeFirstName());
        assertEquals("Gokul", result.get(1).getEmployeeFirstName());
    }
    @Test
    public void testGetBestEmployeeList() {
        
        Employee emp1 = new Employee();
        emp1.setEmployeeId(1);
        emp1.setEmployeeFirstName("Akhil");
        emp1.setEmployeeTotalPoints((long) 1000);

        Employee emp2 = new Employee();
        emp2.setEmployeeId(2);
        emp2.setEmployeeFirstName("Gokul");
        emp2.setEmployeeTotalPoints((long) 1500);

        List<Employee> mockEmployeeList = new ArrayList<>();
        mockEmployeeList.add(emp1);
        mockEmployeeList.add(emp2);

        when(employeeDaoMock.findAllByOrderByemployeeTotalPointsDesc()).thenReturn(mockEmployeeList);
        List<Employee> result = employeeService.getBestEmployeeList();

        assertEquals(2, result.size());
        assertEquals("Akhil", result.get(0).getEmployeeFirstName()); // First employee has more points
        assertEquals("Gokul", result.get(1).getEmployeeFirstName()); // Second employee has fewer points
    }
    
}
