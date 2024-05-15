package com.bytes.intern.ERRS.DTO;
import jakarta.persistence.Column;
public class TransactionDto {
private long employeeId;
    
    @Column(precision=40, scale=0)
    private Long numberofPoints;
    
    private String award;
    private String remarks;
    
	
	
	public TransactionDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}
	public Long getNumberofPoints() {
		return numberofPoints;
	}
	public void setNumberofPoints(Long numberofPoints) {
		this.numberofPoints = numberofPoints;
	}
	public String getAward() {
		return award;
	}
	public void setAward(String award) {
		this.award = award;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
    
}
