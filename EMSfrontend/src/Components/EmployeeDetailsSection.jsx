import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployeeDetailsAll } from "../Services/EMSService";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaUserTie,
  FaEnvelope,
  FaIdCard,
} from "react-icons/fa";
import "./css/EmployeeDetailsSection.css"; 

const EmployeeDetailsSection = () => {
  
  const [employees, setEmployeeDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployeeDetails] = useState([]);
  /*const [filters, setFilters] = useState({
    rid: "",
    name: "",
    poy: "",
    streamName: "",
    status: ""
  });*/
  const navigator = useNavigate();

  useEffect(() => {
    EmployeeDetailsAll();
  }, []);

  // 🔍 Filter function
   useEffect(() => {
    if (!searchTerm) {
      setFilteredEmployeeDetails(employees);
      return;
    }

    const value = searchTerm.toLowerCase();

    const filtered = employees.filter((emp) => {
      return (
        emp.rid?.toString().includes(value) ||
        emp.name?.toLowerCase().includes(value) ||
        emp.poy?.toString().toLowerCase().includes(value) ||
        emp.streamName?.toLowerCase().includes(value) ||
        emp.status?.toLowerCase().includes(value)
      );
    });

    setFilteredEmployeeDetails(filtered);
  }, [employees,searchTerm]);

  function EmployeeDetailsAll() {
    getEmployeeDetailsAll()
      .then((response) => {
        console.log("FULL RESPONSE:", response);
        console.log("DATA:", response.data);
        console.log("ARRAY:", response.data.employeeDetailsAll);

        setEmployeeDetails(response.data.employeeDetailsAll);
        setFilteredEmployeeDetails(response.data.employeeDetailsAll);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addEmployeeDetails() {
    navigator("/add-employee");
  }

  function updateEmployeeDetails(id) {
    navigator(`/edit-employee/${id}`);
  }

  function deleteEmployeeDetails(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      console.log(id);
      deleteEmployee(id)
        .then(() => {
          EmployeeDetailsAll();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  
  return(

    <div className="employee-list-container">
        {/* Header Section */}
      <div className="employee-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="header-content">
                <div className="header-icon">
                  <FaUsers />
                </div>
                <div>
                  <h1 className="page-title">Employee Directory</h1>
                  <p className="page-subtitle">
                    Manage your team members and their information
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button className="btn btn-add-employee" onClick={addEmployeeDetails}>
                <FaPlusCircle className="me-2" />
                Add New Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        {/* Search and Stats Section */}
        <div className="row mb-4">
          <div className="col-lg-8">
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search employees by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="stats-card">
              <div className="stats-content">
                <h3 className="stats-number">{filteredEmployees.length}</h3>
                <p className="stats-label">
                  {searchTerm ? "Found" : "Total"} Employees
                </p>
              </div>
              <div className="stats-icon">
                <FaUserTie />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Cards for Mobile */}
        <div className="d-lg-none">
          <div className="row">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="col-12 mb-3">
                <div className="employee-card-mobile">
                  <div className="employee-card-header">
                    <div className="employee-avatar">
                      <FaUserTie />
                    </div>
                        <div className="employee-info">
                            <p className="employee-id">
                                <FaIdCard className="me-2" />
                                ID: {employee.id}
                            </p>

                            <p className="employee-rid">
                                <FaIdCard className="me-2" />
                                Registartion ID: {employee.rid}
                            </p>

                            <h5 className="employee-name">
                                {employee.name}
                            </h5>

                            <h5 className="parent-name">
                                Parent Name: {employee.parentName}
                            </h5>

                            <p className="employee-email">
                                <FaEnvelope className="me-2" />
                                {employee.mailID}
                            </p>

                            <p className="employee-mobile">
                                Email :{employee.mobileNumber}
                            </p>

                            <p className="employee-stream">
                                Stream: {employee.streamName}
                            </p>

                            <p className="employee-dob">
                                Date of Birth: {employee.dob}
                            </p>

                            <p className="employee-poy">
                                Pass Out Year: {employee.poy}
                            </p>

                            <p className="employee-address">
                                Address: {employee.address}
                            </p>

                            <p className="employee-status">
                                Status: {employee.status}
                            </p>
                    </div>
                  </div>
                  <div className="employee-actions">
                    <button
                      className="btn btn-action btn-edit"
                      onClick={() => updateEmployeeDetails(employee.id)}
                    >
                      <FaEdit className="me-1" />
                      Edit
                    </button>
                    <button
                      className="btn btn-action btn-delete"
                      onClick={() => deleteEmployeeDetails(employee.id)}
                    >
                      <FaTrashAlt className="me-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Employee Table for Desktop */}
        <div className="d-none d-lg-block">
        <div className="table-container">
            <div className="table-responsive">
            <table className="table employee-table">
                <thead>
                <tr>
                    <th><FaIdCard className="me-2" />ID</th>
                    <th><FaIdCard className="me-2" />RID</th>
                    <th><FaUserTie className="me-2" />Name</th>
                    <th><FaIdCard className="me-2" />Parent Name</th>
                    <th><FaIdCard className="me-2" />Stream</th>
                    <th><FaIdCard className="me-2" />Date of Birth</th>
                    <th><FaIdCard className="me-2" />Pass Out Year</th>
                    <th><FaIdCard className="me-2" />Mobile</th>
                    <th><FaEnvelope className="me-2" />Email</th>
                    <th><FaIdCard className="me-2" />Address</th>
                    <th><FaIdCard className="me-2" />Status</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>

                <tbody>
                {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                    
                    <td>
                        <span className="employee-id-badge">{employee.id}</span>
                    </td>

                    <td>{employee.rid}</td>

                    <td>
                        <div className="employee-name-cell">
                        <div className="employee-avatar-small">
                            <FaUserTie />
                        </div>
                        {employee.name}
                        </div>
                    </td>

                    <td>{employee.parentName}</td>

                    <td>{employee.streamName}</td>

                    <td>{employee.dob}</td>

                    <td>{employee.poy}</td>

                    <td>{employee.mobileNumber}</td>

                    <td>
                        <a
                        href={`mailto:${employee.mailID}`}
                        className="email-link"
                        >
                        {employee.mailID}
                        </a>
                    </td>

                    <td>{employee.address}</td>

                    <td>{employee.status}</td>

                    <td>
                        <div className="action-buttons">
                        <button
                            className="btn btn-action btn-edit"
                            onClick={() => updateEmployeeDetails(employee.id)}
                            title="Edit Employee"
                        >
                            <FaEdit />
                        </button>

                        <button
                            className="btn btn-action btn-delete"
                            onClick={() => deleteEmployeeDetails(employee.id)}
                            title="Delete Employee"
                        >
                            <FaTrashAlt />
                        </button>
                        </div>
                    </td>

                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
      {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FaUsers />
            </div>
            <h3>{searchTerm ? "No employees found" : "No employees yet"}</h3>
            <p>
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start by adding your first employee"}
            </p>
            {!searchTerm && (
              <button className="btn btn-add-employee" onClick={addEmployeeDetails}>
                <FaPlusCircle className="me-2" />
                Add First Employee
              </button>
            )}
          </div>
        )}
    </div>
  );
}
export default EmployeeDetailsSection;