package com.bytes.intern.ERRS.service.serviceImpl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bytes.intern.ERRS.DAO.EmployeeDao;
import com.bytes.intern.ERRS.DAO.ProductDao;
import com.bytes.intern.ERRS.DAO.TransactionDao;
import com.bytes.intern.ERRS.DAO.TransactionDebitDao;
import com.bytes.intern.ERRS.DTO.TransactionDebitDto;
import com.bytes.intern.ERRS.DTO.TransactionDto;
import com.bytes.intern.ERRS.model.Employee;
import com.bytes.intern.ERRS.model.Product;
import com.bytes.intern.ERRS.model.TransactionCredit;
import com.bytes.intern.ERRS.model.TransactionDebit;
import com.bytes.intern.ERRS.service.TransactionService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	TransactionDao transactionDao;
	
	@Autowired
	TransactionDebitDao transactionDebitDao;
	
	@Autowired
	EmployeeDao employeeDao;
	
	@Autowired
	ProductDao productDao;
	
	@Override
	public void addTransactionCredit(List<TransactionDto> transactionDtoList) {
		
		for (TransactionDto transactionDto : transactionDtoList) {

            Employee employee = employeeDao.findById(transactionDto.getEmployeeId())
                    .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + transactionDto.getEmployeeId()));
            TransactionCredit transaction = new TransactionCredit();
            transaction.setEmployee(employee);
            transaction.setNumberofPoints(transactionDto.getNumberofPoints());
            transaction.setAward(transactionDto.getAward());
            transaction.setRemarks(transactionDto.getRemarks());
            
            Date currentDate = new Date();
            transaction.setTransactionDateTime(currentDate);
            transactionDao.save(transaction);
	        transactionDao.updateSumOfPoints(); 
	        
			}
        }

	@Override
	public List<TransactionCredit> getPerformance(long employeeId) {
		return transactionDao.findByEmployeeEmployeeId(employeeId); 
	}

	@Override
	public void addTransactionDebit(TransactionDebitDto transactionDebitDto) {
		
        Employee employee = employeeDao.findById(transactionDebitDto.getEmployeeId())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + transactionDebitDto.getEmployeeId()));
       
        Product product = productDao.findById(transactionDebitDto.getMerchendiseId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + transactionDebitDto.getMerchendiseId()));
        
        TransactionDebit transactionDebit = new TransactionDebit();
        transactionDebit.setEmployee(employee);
        transactionDebit.setProduct(product);
        transactionDebit.setMerchendiseCost(transactionDebitDto.getMerchendiseCost());
        transactionDebit.setMerchendiseName(transactionDebitDto.getMerchendiseName());
        Date currentDate = new Date();
        transactionDebit.setTransactionDateTime(currentDate);
        transactionDebitDao.save(transactionDebit);
        productDao.updateProduct(transactionDebitDto.getMerchendiseId());
        transactionDebitDao.updatePointDebit();
        
	}

	@Override
	public List<TransactionDebit> getMyOrders(long employeeId) {
		return transactionDebitDao.findByEmployeeEmployeeId(employeeId);
	}

	@Override
	public List<TransactionCredit> getCreditList() {
		return transactionDao.listCredit();
	}
	@Override
	public List<TransactionDebit> getDebitList() {
		return transactionDebitDao.listDebit();
	}
}

