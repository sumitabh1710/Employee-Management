import React from "react";
import "../App.css";

const NavBar = ({ setAddEmployee }) => {
  const handleClick = (e) => {
    if (e.id == 3) {
      setAddEmployee(true);
    }
  };

  let optionList = [];
  [
    { id: 1, name: "LogIn" },
    { id: 2, name: "SignIn" },
    { id: 3, name: "Add Employee" },
  ].forEach((each) => {
    optionList.push(
      <div
        className="navBarOptions"
        id={each.id}
        key={each.id}
        onClick={() => handleClick(each)}
      >
        {each.name}
      </div>
    );
  });

  return (
    <div className="navBar">
      <h1 className="navBarTitle">Employee Management</h1>
      {optionList}
    </div>
  );
};

export default NavBar;
