// import axios from "axios";

// const GET_EMPLOYEE_DETAILS_ALL ='http://localhost:8080/ems/getEmployeeDetailsAll';
// const GET_EMPLOYEE_DETAILS_SINGLE = 'http://localhost:8080/ems/getEmployeeDetailsByID';
// const CREATE_EMPLOYEE_DETAILS_SINGLE ='http://localhost:8080/ems/insertEmployeeDetails';
// const CREATE_EMPLOYEE_DETAILS ='http://localhost:8080/ems/insertEmployeeDetailsAll';
// const UPDATE_EMPLOYEE_DETAILS_SINGLE ='http://localhost:8080/ems/updateEmployeeDetails';
// const UPDATE_EMPLOYEE_DETAILS_ALL = 'http://localhost:8080/ems/updateEmployeeDetailsAnother';
// const DELETE_EMPLOYEE_DETAILS_SINGLE = 'http://localhost:8080/ems/deleteEmployeeDetailsByID';
// const DELETE_EMPLOYEE_DETAILS_ALL = 'http://localhost:8080/ems/deleteEmployeeDetailsAll';
// const FILTER_EMPLOYEE_DETAILS ='http://localhost:8080/ems/filterEmployeeDetailsGroupData';


// export const getEmployeeDetailsAll = () => axios.get(GET_EMPLOYEE_DETAILS_ALL);

// export const createEmployee = (employee) =>
//   axios.post(CREATE_EMPLOYEE_DETAILS_SINGLE, employee);

// export const getEmployee = (id) =>
//   axios.get(GET_EMPLOYEE_DETAILS_SINGLE + "/" + id);

// export const updateEmployee = (id, employee) =>
//   axios.put(UPDATE_EMPLOYEE_DETAILS_SINGLE + "/" + id, employee);

// export const deleteEmployee = (id) =>
//   axios.delete(DELETE_EMPLOYEE_DETAILS_SINGLE + "/" + id);

import axios from "axios";

const BASE_URL = "http://localhost:8080/ems";

const GET_EMPLOYEE_DETAILS_ALL = BASE_URL + "/getEmployeeDetailsAll";
const GET_EMPLOYEE_DETAILS_SINGLE = BASE_URL + "/getEmployeeDetailsByID";
const CREATE_EMPLOYEE_DETAILS_SINGLE = BASE_URL + "/insertEmployeeDetails";
const CREATE_EMPLOYEE_DETAILS_ALL = BASE_URL + "/insertEmployeeDetailsAll";
const UPDATE_EMPLOYEE_DETAILS_SINGLE = BASE_URL + "/updateEmployeeDetails";
const DELETE_EMPLOYEE_DETAILS_SINGLE = BASE_URL + "/deleteEmployeeDetailsByID";

// ✅ GET ALL
export const getEmployeeDetailsAll = () =>
  axios.get(GET_EMPLOYEE_DETAILS_ALL);

// ✅ GET BY ID (BODY BASED) - not reqd
export const getEmployee = (id) =>
  axios.post(GET_EMPLOYEE_DETAILS_SINGLE, { id });

// ✅ CREATE (SINGLE)
export const createEmployee = (employee) =>
  axios.post(CREATE_EMPLOYEE_DETAILS_SINGLE, employee);

// ✅ CREATE MULTIPLE - not reqd
export const createEmployees = (employees) =>
  axios.post(CREATE_EMPLOYEE_DETAILS_ALL, employees);

// ✅ UPDATE (BODY BASED)
export const updateEmployee = (employee) =>
  axios.post(UPDATE_EMPLOYEE_DETAILS_SINGLE, employee);

// ✅ DELETE (BODY BASED)
export const deleteEmployee = (id) => 
  axios.delete(DELETE_EMPLOYEE_DETAILS_SINGLE, {
    data: { id: id }
  });/*NOTE- If (Object/in requestbody full model entity details reqd), then no {} otherwise suppose single or multiple parameter in payload use {}*/
