package com.bytes.intern.ERRS.DTO;

import java.util.ArrayList;
import java.util.List;





public class PointAllocationDto {
	
	
	private List<Long>employeeIdList=new ArrayList<>();
	
	private Long rewardId;

	public List<Long> getEmployeeIdList() {
		return employeeIdList;
	}

	public void setEmployeeIdList(List<Long> employeeIdList) {
		this.employeeIdList = employeeIdList;
	}

	public Long getRewardId() {
		return rewardId;
	}

	public void setRewardId(Long rewardId) {
		this.rewardId = rewardId;
	}

	public PointAllocationDto() {
		super();
	}
	
	

}
