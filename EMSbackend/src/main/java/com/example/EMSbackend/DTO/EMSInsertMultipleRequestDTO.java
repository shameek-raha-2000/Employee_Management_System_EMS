package com.example.EMSbackend.DTO;

import java.util.List;

import com.example.EMSbackend.Model.EMSModel;

import lombok.Data;

@Data
public class EMSInsertMultipleRequestDTO {

	private List<EMSModel> employeeDetailsRequestAll;
}
