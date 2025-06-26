package com.example.EMSbackend.Model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="EMPLOYEE_DETAILS")
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class EMSModel {

	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY) //READ
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq")
	@SequenceGenerator(name = "emp_seq", sequenceName = "EMPLOYEE_SEQ", allocationSize = 1)
	//@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="ID")  //READ Column annotation
	private Long id;
	
	@Column(name="E_R_ID")
	private Integer rid;
	
	@Column(name="E_NAME")
	private String name;
	
	@Column(name="E_PARENT_NAME")
	private String parentName;
	
	@Column(name="E_STREAM_NAME")
	private String streamName;
	
	@Column(name="E_DOB")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate DOB;
	
	@Column(name="E_POY")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate POY;
	
	@Column(name="E_MOBILE_NUMBER")
	private String mobileNumber;
	
	@Column(name="E_MAIL_ID")
	private String mailID;
	
	@Column(name="E_ADDRESS")
	private String address;
	
	@Column(name="E_STATUS")
	private String status;
}
