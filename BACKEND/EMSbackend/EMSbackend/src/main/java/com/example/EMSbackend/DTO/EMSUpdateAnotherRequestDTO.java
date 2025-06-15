package com.example.EMSbackend.DTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class EMSUpdateAnotherRequestDTO {

	private Long id;
	
	private Integer rid;

	private String name;
	
	private String parentName;

	private String streamName;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate DOB;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate POY;

	private String mobileNumber;
	
	private String mailID;

	private String address;
	
	private String status;
}
