package com.bytes.intern.ERRS.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bytes.intern.ERRS.model.Employee;


@Repository
public interface EmployeeDao extends JpaRepository<Employee, Long> {
	Employee findByEmail(String emp_Email);
	@Query(value="SELECT * FROM employee order by employee_total_points desc LIMIT 3",nativeQuery = true)
	List<Employee> findAllByOrderByemployeeTotalPointsDesc();
	

}

