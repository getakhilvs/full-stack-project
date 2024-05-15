package com.bytes.intern.ERRS.DTO;

public class TransactionDebitDto {
	private long employeeId;
	private String merchendiseName;
	private long merchendiseCost;
	private long merchendiseId;
	public TransactionDebitDto(long employeeId, String merchendiseName, long merchendiseCost, long merchendiseId) {
		super();
		this.employeeId = employeeId;
		this.merchendiseName = merchendiseName;
		this.merchendiseCost = merchendiseCost;
		this.merchendiseId = merchendiseId;
	}
	public TransactionDebitDto() {
		super();
	}
	public long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}
	public String getMerchendiseName() {
		return merchendiseName;
	}
	public void setMerchendiseName(String merchendiseName) {
		this.merchendiseName = merchendiseName;
	}
	public long getMerchendiseCost() {
		return merchendiseCost;
	}
	public void setMerchendiseCost(long merchendiseCost) {
		this.merchendiseCost = merchendiseCost;
	}
	public long getMerchendiseId() {
		return merchendiseId;
	}
	public void setMerchendiseId(long merchendiseId) {
		this.merchendiseId = merchendiseId;
	}
}
