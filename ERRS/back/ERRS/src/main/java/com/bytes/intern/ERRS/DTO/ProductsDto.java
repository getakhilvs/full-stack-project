package com.bytes.intern.ERRS.DTO;

public class ProductsDto {
    
	private String merchName;
	private Long merchId;
	private String merchCategory;
	private String merchDescription;
	private String merchManufacturer;
	private int merchQuantity;
	private long merchPoints;
	private int merchSINO;
	private String base64Image;
	private String merchRedemptionConditions;
	public String getMerchName() {
		return merchName;
	}
	public void setMerchName(String merchName) {
		this.merchName = merchName;
	}
	public int getMerchSINO() {
		return merchSINO;
	}
	public void setMerchSINO(int merchSINO) {
		this.merchSINO = merchSINO;
	}
	public String getMerchCategory() {
		return merchCategory;
	}
	public void setMerchCategory(String merchCategory) {
		this.merchCategory = merchCategory;
	}
	public String getMerchDescription() {
		return merchDescription;
	}
	public void setMerchDescription(String merchDescription) {
		this.merchDescription = merchDescription;
	}
	public String getMerchManufacturer() {
		return merchManufacturer;
	}
	public void setMerchManufacturer(String merchManufacturer) {
		this.merchManufacturer = merchManufacturer;
	}
	public int getMerchQuantity() {
		return merchQuantity;
	}
	
	public ProductsDto(String merchName, String merchCategory, String merchDescription, String merchManufacturer,
			int merchQuantity, long merchPoints, String base64Image, String merchRedemptionConditions) {
		super();
		this.merchName = merchName;
		this.merchCategory = merchCategory;
		this.merchDescription = merchDescription;
		this.merchManufacturer = merchManufacturer;
		this.merchQuantity = merchQuantity;
		this.merchPoints = merchPoints;
		this.base64Image = base64Image;
		this.merchRedemptionConditions = merchRedemptionConditions;
		
	}
	public String getBase64Image() {
		return base64Image;
	}
	public void setBase64Image(String base64Image) {
		this.base64Image = base64Image;
	}
	public void setMerchQuantity(int merchQuantity) {
		this.merchQuantity = merchQuantity;
	}
	public long getMerchPoints() {
		return merchPoints;
	}
	public void setMerchPoints(long merchPoints) {
		this.merchPoints = merchPoints;
	}
	public String getMerchRedemptionConditions() {
		return merchRedemptionConditions;
	}
	public void setMerchRedemptionConditions(String merchRedemptionConditions) {
		this.merchRedemptionConditions = merchRedemptionConditions;
	}
	
	public ProductsDto() {
		super();
	}
	public Long getmerchId() {
		
		return merchId;
	}
	
	
}
