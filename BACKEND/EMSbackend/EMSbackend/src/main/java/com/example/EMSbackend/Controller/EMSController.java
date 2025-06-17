package com.example.EMSbackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EMSbackend.DTO.EMSDeleteAllResponseDTO;
import com.example.EMSbackend.DTO.EMSDeleteRequestDTO;
import com.example.EMSbackend.DTO.EMSDeleteResponseDTO;
import com.example.EMSbackend.DTO.EMSGetEmployeeDetailsAllResponseDTO;
import com.example.EMSbackend.DTO.EMSGetEmployeeDetailsByIDRequestDTO;
import com.example.EMSbackend.DTO.EMSGetEmployeeDetailsByIDResponseDTO;
import com.example.EMSbackend.DTO.EMSInsertMultipleRequestDTO;
import com.example.EMSbackend.DTO.EMSInsertMultipleResponseDTO;
import com.example.EMSbackend.DTO.EMSInsertSingleRequestDTO;
import com.example.EMSbackend.DTO.EMSInsertSingleResponseDTO;
import com.example.EMSbackend.DTO.EMSUpdateAnotherRequestDTO;
import com.example.EMSbackend.DTO.EMSUpdateAnotherResponseDTO;
import com.example.EMSbackend.DTO.EMSUpdateRequestDTO;
import com.example.EMSbackend.DTO.EMSUpdateResponseDTO;
import com.example.EMSbackend.Service.EMSService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping(value = "/ems")
public class EMSController {

	@Autowired
	private EMSService emsService;
	
//ALL REST_API ===============================================================================================================================
	
//GET_ALL_EMPLOYEE_DETAILS
	
	@GetMapping(value="/getEmployeeDetailsAll")
	public ResponseEntity<EMSGetEmployeeDetailsAllResponseDTO>getEmployeeDetailsAll() throws Exception{
		
		EMSGetEmployeeDetailsAllResponseDTO response = null;
	    response = emsService.getEmployeeDetailsAll();  
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

//GET_EMPLOYEE_DETAILS_BY_ID

	@GetMapping(value="/getEmployeeDetailsByID")
	public ResponseEntity<EMSGetEmployeeDetailsByIDResponseDTO>getEmployeeDetailsAll(@RequestBody EMSGetEmployeeDetailsByIDRequestDTO insertData) throws Exception{
		
		EMSGetEmployeeDetailsByIDResponseDTO response = null;
	    response = emsService.getEmployeeDetailsByID(insertData);  
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//INSERT_ALL_EMPLOYEE_DETAILS(SINGLE_DATA/NOT_LIST)
	
	@PostMapping("/insertEmployeeDetails")
	public ResponseEntity<EMSInsertSingleResponseDTO>insertEmployeeDetailsAll(@RequestBody EMSInsertSingleRequestDTO insertData) throws Exception{

		EMSInsertSingleResponseDTO response = null;
		response = emsService.insertEmployeeDetails(insertData);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
//INSERT_ALL_EMPLOYEE_DETAILS(MULTIPLE/LIST)

	@PostMapping("/insertEmployeeDetailsAll")
	public ResponseEntity<EMSInsertMultipleResponseDTO>insertEmployeeDetailsAll(@RequestBody EMSInsertMultipleRequestDTO insertData)throws Exception{
		
		EMSInsertMultipleResponseDTO response = null;
		response = emsService.insertEmployeeDetailsAll(insertData);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//UPDATE EMPLOYEE DETAILS -IF I WANT TO SEND ONLY MESSAGE THAT DATA IS UPDATED PROPERLY
	
	@PostMapping("/updateEmployeeDetails")
	public ResponseEntity<EMSUpdateResponseDTO>updateEmployeeDetails(@RequestBody EMSUpdateRequestDTO insertData)throws Exception{
		
		EMSUpdateResponseDTO response = null;
		response = emsService.updateEmployeeDetails(insertData);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//UPDATE EMPLOYEE DETAILS -IF I WANT TO SEND ONLY DTO/DATA THAT DATA IS UPDATED PROPERLY IN RESPONSE
	
	@PostMapping("/updateEmployeeDetailsAnother")
	public ResponseEntity<EMSUpdateAnotherResponseDTO>updateEmployeeDetailsAnother(@RequestBody EMSUpdateAnotherRequestDTO insertData)throws Exception{
		
		EMSUpdateAnotherResponseDTO response = null;
		response = emsService.updateEmployeeDetailsAnother(insertData);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

//DELETE SINGLE EMPLOYEE DETAILS	
	
	@DeleteMapping("/deleteEmployeeDetailsByID")
	public ResponseEntity<EMSDeleteResponseDTO>deleteEmployeeDetails(@RequestBody EMSDeleteRequestDTO insertData)throws Exception{
		
		EMSDeleteResponseDTO response = null;
		response = emsService.deleteEmployeeDetails(insertData);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//DELETE ALL EMPLOYEE DETAILS	
	
	@DeleteMapping("/deleteEmployeeDetailsAll")
	public ResponseEntity<EMSDeleteAllResponseDTO>deleteEmployeeDetailsAll()throws Exception{
		
		EMSDeleteAllResponseDTO response = null;
		response = emsService.deleteEmployeeDetailsAll();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
//ALL FILTERS SECTION -shameek raha
	
	
}
