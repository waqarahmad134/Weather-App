import React from "react";

function Card(props) {
  return (
    <>
      <div className="box">
        <h4>{props?.name}</h4>
        <div className="border">
          <img src={props?.icon} className="img" alt="max_temp" />
        </div>
        <h3>{props?.temp}</h3>
      </div>
    </>
  );
}

export default Card;
