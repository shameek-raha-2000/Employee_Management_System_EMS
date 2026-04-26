import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeDetailsAll,
  updateEmployee,
  getEmployeeByID
  
}from "../Services/EMSService";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaSave,
  FaArrowLeft,
  FaUserPlus,
  FaUserEdit,
} from "react-icons/fa";
import "./css/AddandUpdateEmployeeSection.css";


const AddandUpdateEmployeeSection = () => {

const [employee, setEmployee] = useState({
  rid: "",
  name: "",
  parentName: "",
  streamName: "",
  dob: "",
  poy: "",
  mobileNumber: "",
  mailID: "",
  address: "",
  status: ""
});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const [errors, setErrors] = useState({
  rid: "",
  name: "",
  parentName: "",
  streamName: "",
  dob: "",
  poy: "",
  mobileNumber: "",
  mailID: "",
  address: "",
  status: ""
});

const clearForm = () => {
  setEmployee({
    rid: "",
    name: "",
    parentName: "",
    streamName: "",
    dob: "",
    poy: "",
    mobileNumber: "",
    mailID: "",
    address: "",
    status: ""
  });

  setErrors({
    rid: "",
    name: "",
    parentName: "",
    streamName: "",
    dob: "",
    poy: "",
    mobileNumber: "",
    mailID: "",
    address: "",
    status: ""
  });
};
const navigator = useNavigate();

  // ✅ Load data for edit
  useEffect(() => {
  console.log("ID from URL:", id);
  if (id) {
    setIsLoading(true);
    getEmployeeDetailsAll()
      .then((response) => {
        const allEmployees = response.data.employeeDetailsAll; // ← your data is nested here
        const found = allEmployees.find((emp) => emp.id === parseInt(id));
        console.log("FOUND EMPLOYEE:", found);
        if (found) setEmployee(found);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
}, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    console.log("Payload:", employee); // full object

    if (id) {
      // ✅ UPDATE (POST, full object with id)
      updateEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      // ✅ CREATE
      createEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }
}
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    // RID
    if (!employee.rid) {
      errorsCopy.rid = "RID is required";
      valid = false;
    } else {
      errorsCopy.rid = "";
    }

    // NAME
    if (!employee.name || employee.name.trim().length < 2) {
      errorsCopy.name = "Name must be at least 2 characters";
      valid = false;
    } else {
      errorsCopy.name = "";
    }

    // PARENT NAME
    if (!employee.parentName || employee.parentName.trim().length < 2) {
      errorsCopy.parentName = "Parent name must be at least 2 characters";
      valid = false;
    } else {
      errorsCopy.parentName = "";
    }

    // STREAM
    if (!employee.streamName) {
      errorsCopy.streamName = "Stream is required";
      valid = false;
    } else {
      errorsCopy.streamName = "";
    }

    // DOB
    if (!employee.dob) {
      errorsCopy.dob = "Date of Birth is required";
      valid = false;
    } else {
      errorsCopy.dob = "";
    }

    // POY
    if (!employee.poy) {
      errorsCopy.poy = "Passing Year is required";
      valid = false;
    } else {
      errorsCopy.poy = "";
    }

    // MOBILE
    if (!employee.mobileNumber) {
      errorsCopy.mobileNumber = "Mobile number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(employee.mobileNumber)) {
      errorsCopy.mobileNumber = "Enter valid 10 digit mobile number";
      valid = false;
    } else {
      errorsCopy.mobileNumber = "";
    }

    // EMAIL
    if (!employee.mailID) {
      errorsCopy.mailID = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.mailID)) {
      errorsCopy.mailID = "Enter valid email";
      valid = false;
    } else {
      errorsCopy.mailID = "";
    }

    // ADDRESS
    if (!employee.address) {
      errorsCopy.address = "Address is required";
      valid = false;
    } else {
      errorsCopy.address = "";
    }

    // STATUS
    if (!employee.status) {
      errorsCopy.status = "Status is required";
      valid = false;
    } else {
      errorsCopy.status = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  function getPageTitle() {
      if (id) {
        return {
          title: "Update Employee",
          subtitle: "Modify employee information",
          icon: <FaUserEdit />,
        };
      } else {
        return {
          title: "Add New Employee",
          subtitle: "Create a new employee record",
          icon: <FaUserPlus />,
        };
      }
    }
  
  const pageInfo = getPageTitle();

return (

  <div className="employee-form-container">
    {/* Header Section */}
    <div className="employee-form-header">
        <div className="container">
          <div className="row align-items-center py-4">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-outline-secondary me-3"
                onClick={() => navigator("/employees")}
              >
                <FaArrowLeft className="me-2" />
                Back to Employees
              </button>
            </div>
            <div className="col">
              <div className="d-flex align-items-center">
                <div className="page-icon me-3">{pageInfo.icon}</div>
                <div>
                  <h1 className="page-title mb-1">{pageInfo.title}</h1>
                  <p className="page-subtitle mb-0">{pageInfo.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    {/* Form Section */}
    <div className="employee-form-content">
    <div className="container">
        <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
            <div className="employee-form-card">
            <div className="card-body p-4 p-md-5">

                {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                )}

                <form onSubmit={saveOrUpdateEmployee} noValidate>

                {/* RegistrationID */}
                <div className="form-group mb-3">
                    <label className="form-label">Registration ID</label>
                    <input
                    type="number"
                    placeholder="Enter Registration ID"
                    name="registration id"
                    value={employee.rid}
                    onChange={(e) =>
                        setEmployee({ ...employee, rid: e.target.value })
                    }
                    className={`form-control ${errors.rid ? "is-invalid" : ""}`}
                    disabled={isLoading}
                    />
                </div>

                {/* Name */}
                <div className="form-group mb-3">
                    <label className="form-label">Name</label>
                    <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={employee.name}
                    onChange={(e) =>
                        setEmployee({ ...employee, name: e.target.value })
                    }
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    disabled={isLoading}
                    />
                </div>

                {/* Parent Name */}
                <div className="form-group mb-3">
                    <label className="form-label">Parent Name</label>
                    <input
                    type="text"
                    placeholder="Enter Parent Name"
                    value={employee.parentName}
                    onChange={(e) =>
                        setEmployee({ ...employee, parentName: e.target.value })
                    }
                    className="form-control"
                    disabled={isLoading}
                    />
                </div>

                {/* Stream */}
                <div className="form-group mb-3">
                    <label className="form-label">Stream</label>
                    <input
                    type="text"
                    placeholder="Enter Stream"
                    value={employee.streamName}
                    onChange={(e) =>
                        setEmployee({ ...employee, streamName: e.target.value })
                    }
                    className="form-control"
                    disabled={isLoading}
                    />
                </div>

                {/* DOB */}
                <div className="form-group mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                    type="date"
                    value={employee.dob}
                    onChange={(e) =>
                        setEmployee({ ...employee, dob: e.target.value })
                    }
                    className="form-control"
                    disabled={isLoading}
                    />
                </div>

                {/* POY */}
                <div className="form-group mb-3">
                    <label className="form-label">Pass Out Year</label>
                    <input
                    type="date"
                    value={employee.poy}
                    onChange={(e) =>
                        setEmployee({ ...employee, poy: e.target.value })
                    }
                    className="form-control"
                    disabled={isLoading}
                    />
                </div>

                {/* Mobile */}
                <div className="form-group mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={employee.mobileNumber}
                    onChange={(e) =>
                        setEmployee({ ...employee, mobileNumber: e.target.value })
                    }
                    className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`}
                    disabled={isLoading}
                    />
                </div>

                {/* Email */}
                <div className="form-group mb-3">
                    <label className="form-label">Email</label>
                    <input
                    type="email"
                    placeholder="Enter Email"
                    value={employee.mailID}
                    onChange={(e) =>
                        setEmployee({ ...employee, mailID: e.target.value })
                    }
                    className={`form-control ${errors.mailID ? "is-invalid" : ""}`}
                    disabled={isLoading}
                    />
                </div>

                {/* Address */}
                <div className="form-group mb-3">
                    <label className="form-label">Address</label>
                    <input
                    type="text"
                    placeholder="Enter Address"
                    value={employee.address}
                    onChange={(e) =>
                        setEmployee({ ...employee, address: e.target.value })
                    }
                    className="form-control"
                    disabled={isLoading}
                    />
                </div>

                {/* Status */}
                <div className="form-group mb-4">
                    <label className="form-label">Status</label>
                    <select
                    value={employee.status}
                    onChange={(e) =>
                        setEmployee({ ...employee, status: e.target.value })
                    }
                    className={`form-control ${errors.status ? "is-invalid" : ""}`}
                    disabled={isLoading}
                    >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="No Active">No Active</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg action-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : id ? "Update Employee" : "Add Employee"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg action-btn clear-btn"
                    onClick={clearForm}
                    disabled={isLoading}
                  >
                    Clear
                  </button>
                 </div>

                </form>

                {/* Help Text */}
                <div className="help-text mt-4">
                <div className="p-3 rounded-3 bg-light border small">
                    <div className="d-flex align-items-start">
                    <i className="fas fa-info-circle text-primary me-2 mt-1"></i>
                    <div>
                        <h6 className="mb-2 fw-semibold">Form Guidelines</h6>
                        <ul className="mb-0 ps-3">
                        <li>Registration ID, Stream, DOB, Passing Year and Status are required</li>
                        <li>Name and Parent Name must be at least 2 characters</li>
                        <li>Mobile number must be a valid 10-digit number</li>
                        <li>Email must be in a valid format (e.g. user@example.com)</li>
                        <li>Address cannot be empty</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  </div>
);
};

export default AddandUpdateEmployeeSection;