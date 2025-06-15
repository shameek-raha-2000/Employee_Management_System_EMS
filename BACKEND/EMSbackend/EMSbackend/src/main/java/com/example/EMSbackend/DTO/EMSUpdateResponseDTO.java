package com.example.EMSbackend.DTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class EMSUpdateResponseDTO {

	//IF I WANT TO SEND ONLY MESSAGE THAT DATA IS UPDATED PROPERLY
	private String message;
	
	private String code;
	
	//IF I WANT TO SEND THE SAME DTO/DATA THAT HAS BEEN UPDATED -UNCOMMENT THIS BELOW PART
	/*private Long id;
	
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
	
	private String status;*/
}
