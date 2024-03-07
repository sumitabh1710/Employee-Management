import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import PopUp from "./Component/PopUp";
import { useEffect, useState } from "react";

function App() {
  const [addEmployee, setAddEmployee] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeType, setEmployeeType] = useState("user");
  const [submit, setSubmit] = useState(false);
  const [employeeAdded, setEmployeeAdded] = useState(false);

  async function postEmployees() {
    try {
      const response = await fetch("http://127.0.0.1:8080/demo/add", {
        method: "POST",
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

  useEffect(() => {
    if (submit) {
      postEmployees();
    }
  }, [submit]);

  return (
    <div className="App">
      <NavBar setAddEmployee={setAddEmployee}></NavBar>
      <div className="pageContent">
        <div className="topBar"></div>
        <Home employeeAdded={employeeAdded}></Home>
      </div>
      {addEmployee && (
        <PopUp setShow={setAddEmployee}>
          <div className="addEmployee">
            <p className="addEmployeeTitle">Add Employee</p>
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
}

export default App;
