package com.example.EMSbackend.DTO;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EMSGetEmployeeDetailsByIDResponseDTO {

	private Long id;
	
	private Integer rid;

	private String name;
	
	private String parentName;

	private String streamName;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate poy;

	private String mobileNumber;
	
	private String mailID;

	private String address;
	
	private String status;
	
	private String message;
}
