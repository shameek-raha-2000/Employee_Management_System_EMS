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

                  {/* HEADER */}
                  <div className="employee-card-header">
                    <div className="employee-avatar">
                      <FaUserTie />
                    </div>
                    <div>
                      <div className="name">{employee.name}</div>
                      <div className="sub-text">{employee.parentName}</div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="employee-info">

                    <div><span>ID</span><span>{employee.id}</span></div>
                    <div><span>Reg ID</span><span>{employee.rid}</span></div>
                    <div><span>Email</span><span>{employee.mailID}</span></div>
                    <div><span>Mobile</span><span>{employee.mobileNumber}</span></div>
                    <div><span>Stream</span><span>{employee.streamName}</span></div>
                    <div><span>DOB</span><span>{employee.dob}</span></div>
                    <div><span>Pass Year</span><span>{employee.poy}</span></div>
                    <div><span>Address</span><span>{employee.address}</span></div>
                    <div><span>Status</span><span>{employee.status}</span></div>

                  </div>

                  {/* ACTIONS */}
                  <div className="employee-actions">
                    <button
                      className="btn btn-action btn-edit"
                      onClick={() => updateEmployeeDetails(employee.id)}
                    >
                      <FaEdit className="me-1" /> Edit
                    </button>

                    <button
                      className="btn btn-action btn-delete"
                      onClick={() => deleteEmployeeDetails(employee.id)}
                    >
                      <FaTrashAlt className="me-1" /> Delete
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

                {/* ===== HEADER ===== */}
                <thead>
                  <tr>
                    <th><FaIdCard /> ID</th>
                    <th><FaIdCard /> Reg ID</th>
                    <th><FaUserTie /> Name</th>
                    <th><FaIdCard /> Parent</th>
                    <th><FaIdCard /> Stream</th>
                    <th><FaIdCard /> DOB</th>
                    <th><FaIdCard /> Pass Year</th>
                    <th><FaIdCard /> Mobile</th>
                    <th><FaEnvelope /> Email</th>
                    <th><FaIdCard /> Address</th>
                    <th><FaIdCard /> Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                {/* ===== BODY ===== */}
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
                          <span className="name-text">{employee.name}</span>
                        </div>
                      </td>

                      <td className="sub-text">{employee.parentName}</td>

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

                      <td className="address-cell">{employee.address}</td>

                      <td>
                        <span className={`status-badge ${employee.status === 'Active' ? 'active' : 'inactive'}`}>
                          {employee.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-action btn-edit"
                            onClick={() => updateEmployeeDetails(employee.id)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="btn btn-action btn-delete"
                            onClick={() => deleteEmployeeDetails(employee.id)}
                            title="Delete"
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