import React from "react";
import "../App.css";

const NavBar = ({ setAddEmployee }) => {
  const handleClick = (e) => {
    if (e.target.id === "Add Employee") {
      setAddEmployee(true);
    }
  };

  let optionList = [];
  ["LogIn", "SignIn", "Add Employee"].forEach((each) => {
    optionList.push(
      <div className="navBarOptions" id={each} onClick={(e) => handleClick(e)}>
        {each}
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
