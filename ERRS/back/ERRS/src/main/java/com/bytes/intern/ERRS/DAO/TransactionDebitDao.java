package com.bytes.intern.ERRS.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bytes.intern.ERRS.model.TransactionDebit;

@Repository
public interface TransactionDebitDao extends JpaRepository<TransactionDebit, Long> {
	
	@Modifying
	@Query(value = "UPDATE employee SET employee_total_debit_points = COALESCE( ( SELECT SUM(transaction_debit.merchendise_cost) FROM transaction_debit WHERE transaction_debit.employee_id = employee.employee_id), 0)", nativeQuery=true)
	void updatePointDebit();

	List<TransactionDebit> findByEmployeeEmployeeId(long employeeId);
	@Query(value="select * from transaction_debit",nativeQuery=true)
	List<TransactionDebit> listDebit();

}
