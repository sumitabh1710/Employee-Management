import React from "react";
import "../App.css";

const PopUp = ({ setShow, children }) => {
  const handleClose = (e) => {
    setShow(false);
  };

  return (
    <div className="popUp" onClick={(e) => handleClose(e)}>
      <div className="popUpContainer" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
