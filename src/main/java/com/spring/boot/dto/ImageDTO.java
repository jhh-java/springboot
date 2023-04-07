package com.spring.boot.dto;

import org.springframework.stereotype.Repository;

@Repository
public class ImageDTO {
	private String filePath;

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	} 

}
