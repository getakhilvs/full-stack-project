package com.bytes.intern.ERRS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="achievement")
public class Achievement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long achievement_id;
	
	private String achievement_name;
	private String achievement_desc;
	private long points;
	public Achievement(long achievement_id, String achievement_name, String achievement_desc,long points) {
		super();
		this.achievement_id = achievement_id;
		this.achievement_name = achievement_name;
		this.achievement_desc = achievement_desc;
		this.points=points;
	}
	
	
	public long getPoints() {
		return points;
	}


	public void setPoints(long points) {
		this.points = points;
	}


	public long getAchievement_id() {
		return achievement_id;
	}
	public void setAchievement_id(long achievement_id) {
		this.achievement_id = achievement_id;
	}
	public String getAchievement_name() {
		return achievement_name;
	}
	public void setAchievement_name(String achievement_name) {
		this.achievement_name = achievement_name;
	}
	public String getAchievement_desc() {
		return achievement_desc;
	}
	public void setAchievement_desc(String achievement_desc) {
		this.achievement_desc = achievement_desc;
	}


	public Achievement() {
		super();
		
	}
	
}
