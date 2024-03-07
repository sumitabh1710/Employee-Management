import React, { useEffect, useState } from "react";
import "../App.css";
import Spinner from "./Spinner";
import PopUp from "./PopUp";

const Home = ({ employeeAdded }) => {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const [employeeType, setEmployeeType] = useState("user");
  const [submit, setSubmit] = useState(false);
  const [currClicked, setCurrClicked] = useState({});

  async function getEmployees() {
    setLoading(true);
    fetch("http://127.0.0.1:8080/demo/all")
      .then((res) => res.json())
      .then((res) => {
        setEmployees(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function putEmployees() {
    try {
      const response = await fetch(`http://127.0.0.1:8080/demo/add?id=${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          roleName: employeeType,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setSubmit(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deleteEmployees(id) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/demo/delete?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleDelete = (e) => {
    deleteEmployees(e.id);
  };

  useEffect(() => {
    if (submit) {
      putEmployees();
    }
  }, [submit]);

  useEffect(() => {
    getEmployees();
  }, [refresh, employeeAdded]);

  useEffect(() => {
    if (editEmployee) {
      console.log(currClicked);
      setName(currClicked.name);
      setEmail(currClicked.email);
      setEmployeeType(currClicked.role_id.name);
    }
  }, [editEmployee]);

  const handleEdit = (e) => {
    setEditEmployee(true);
    setCurrClicked(e);
    setId(e.id);
  };

  return (
    <div className="home">
      <div className="refresh">
        <button
          className="refreshButton"
          onClick={() => {
            setRefresh(!refresh);
          }}
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <table className="homeTable">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {employees.map((each, index) => (
            <tr key={each.id} id={each.id}>
              <td>{index+1}</td>
              <td>{each.name}</td>
              <td>{each.email}</td>
              <td>
                <button onClick={() => handleEdit(each)}>Edit</button>
                <button onClick={() => handleDelete(each)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      )}
      {editEmployee && (
        <PopUp setShow={setEditEmployee}>
          <div className="addEmployee">
            <p className="addEmployeeTitle">Edit Employee</p>
            <form className="addEmployeeForm">
              <input
                className="addEmployeeName formCommon"
                type="text"
                name="Name"
                placeholder="Please Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="addEmployeeEmail formCommon"
                type="text"
                name="Email"
                placeholder="Please Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                className="addEmployeeType formCommon"
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <input
                className="refreshButton formCommon"
                type="submit"
                value="Submit"
                onClick={() => {
                  setSubmit(true);
                }}
              />
            </form>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Home;
