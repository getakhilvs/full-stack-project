package com.bytes.intern.ERRS.service;

import java.util.List;

import com.bytes.intern.ERRS.DTO.TransactionDebitDto;
import com.bytes.intern.ERRS.DTO.TransactionDto;
import com.bytes.intern.ERRS.model.TransactionCredit;
import com.bytes.intern.ERRS.model.TransactionDebit;

public interface TransactionService {

	public void addTransactionCredit(List<TransactionDto> transactionDtoList);
	
	List<TransactionCredit> getPerformance(long employeeId);

	public void addTransactionDebit(TransactionDebitDto transactionDebitDto);

	public List<TransactionDebit> getMyOrders(long employeeId);

	public List<TransactionCredit> getCreditList();

	public List<TransactionDebit> getDebitList();

}