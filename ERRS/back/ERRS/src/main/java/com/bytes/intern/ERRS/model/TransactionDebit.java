package com.bytes.intern.ERRS.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="transaction_debit")
public class TransactionDebit {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long transactionDebitId;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;
    
    @Column
    private long merchendiseCost;
    
    @Column
    private String merchendiseName;
    
    @ManyToOne
    @JoinColumn(name = "merchendise_id", nullable = false)
    private Product product;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date transactionDateTime;

	public TransactionDebit(Long transactionDebitId, Employee employee, long merchendiseCost, String merchendiseName,
			Product product, Date transactionDateTime) {
		super();
		this.transactionDebitId = transactionDebitId;
		this.employee = employee;
		this.merchendiseCost = merchendiseCost;
		this.merchendiseName = merchendiseName;
		this.product = product;
		this.transactionDateTime = transactionDateTime;
	}

	public TransactionDebit() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getTransactionDebitId() {
		return transactionDebitId;
	}

	public void setTransactionDebitId(Long transactionDebitId) {
		this.transactionDebitId = transactionDebitId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public long getMerchendiseCost() {
		return merchendiseCost;
	}

	public void setMerchendiseCost(long merchendiseCost) {
		this.merchendiseCost = merchendiseCost;
	}

	public String getMerchendiseName() {
		return merchendiseName;
	}

	public void setMerchendiseName(String merchendiseName) {
		this.merchendiseName = merchendiseName;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Date getTransactionDateTime() {
		return transactionDateTime;
	}

	public void setTransactionDateTime(Date transactionDateTime) {
		this.transactionDateTime = transactionDateTime;
	}
    
    
}
