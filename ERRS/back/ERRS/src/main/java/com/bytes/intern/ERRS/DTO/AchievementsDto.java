package com.bytes.intern.ERRS.DTO;

public class AchievementsDto {
	private String achievement_name;
	private String achievement_desc;
	private long points;
	public AchievementsDto( String achievement_name, String achievement_desc,long points) {
		super();
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
}
