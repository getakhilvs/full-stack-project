package com.bytes.intern.ERRS.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bytes.intern.ERRS.model.TransactionCredit;

@Repository
public interface TransactionDao extends JpaRepository<TransactionCredit, Long> {

	List<TransactionCredit> findByEmployeeEmployeeId(long employeeId);
	
	@Modifying
	@Query(value = "UPDATE employee SET employee_total_points = (SELECT SUM(transaction_credits.numberof_points) FROM transaction_credits WHERE transaction_credits.employee_id = employee.employee_id)", nativeQuery=true)
	void updateSumOfPoints();
	@Query(value="SELECT employee.employee_id,employee.employee_first_name,transaction_credits.transaction_id,transaction_credits.award,transaction_credits.numberof_points,transaction_credits.transaction_date_time,transaction_credits.remarks FROM employee JOIN transaction_credits ON employee.employee_id = transaction_credits.employee_id",nativeQuery=true)
	List<TransactionCredit> listCredit();
	
	
}
