package com.example.EMSbackend.DTO;

import java.util.List;

import com.example.EMSbackend.Model.EMSModel;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) //READ
public class EMSFilterEmployeeDetailsGroupDataResponseDTO {

	private List<EMSModel> filterEmployeeDetailsGroupData;
	private String message;
}
