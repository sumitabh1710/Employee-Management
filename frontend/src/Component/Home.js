import React, { useEffect, useState } from "react";
import "../App.css";
import Spinner from "./Spinner";

const Home = ({ employeeAdded }) => {
  
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);

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

  useEffect(() => {
    getEmployees();
  }, [refresh, employeeAdded]);

  const handleDoubleClick = () => {};

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
          </tr>
          {employees.map((each) => (
            <tr
              style={{ cursor: "pointer" }}
              onDoubleClick={(e) => {
                handleDoubleClick(e);
              }}
            >
              <td>{each.id}</td>
              <td>{each.name}</td>
              <td>{each.email}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default Home;
